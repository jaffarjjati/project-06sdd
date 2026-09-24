"use client";
import { useEffect, useRef } from "react";

// colors go dark -> light; dots = halftone cell size in px (0 = off)
const variants = {
  soft: { colors: ["#fff5f7", "#ffd3de", "#fbe0ef", "#ff8fb1"], dots: 0 },
  rose: { colors: ["#881337", "#e11d48", "#db2777", "#f43f5e"], dots: 0 },
  ink: { colors: ["#1f0612", "#be123c", "#ff2d87", "#ff9ec4"], dots: 6 },
};

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// domain-warped fbm that swirls around the cursor, optional riso halftone, film grain
const FRAG = `precision highp float;
uniform vec2 r,m;uniform float t,dots;uniform vec3 c[4];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.02+17.;a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/r;vec2 p=gl_FragCoord.xy/r.y*1.6;float s=t*.07;
vec2 d=(uv-m)*vec2(r.x/r.y,1.);p+=vec2(-d.y,d.x)*exp(-dot(d,d)*5.)*2.2;
vec2 q=vec2(fbm(p+s),fbm(p+vec2(5.2,1.3)-s));
vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+s*1.4),fbm(p+3.*q+vec2(8.3,2.8)-s));
float f=fbm(p+3.*w);
vec3 col=mix(c[0],c[1],smoothstep(.2,.7,f));
col=mix(col,c[2],smoothstep(.45,.85,length(q)));
col=mix(col,c[3],smoothstep(.55,.9,w.y));
if(dots>0.){
vec2 g=fract(mat2(.7071,-.7071,.7071,.7071)*gl_FragCoord.xy/dots)-.5;
float l=dot(col,vec3(.299,.587,.114));
col=mix(col,c[0],smoothstep(.05,0.,length(g)-(1.-l)*.45)*.55);}
col+=(h(gl_FragCoord.xy)-.5)*.06;
gl_FragColor=vec4(col,1.);}`;

const hexToRgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

interface ShaderGradientProps {
  variant?: keyof typeof variants;
  className?: string;
}

const ShaderGradient = ({
  variant = "soft",
  className = "",
}: ShaderGradientProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const program = gl.createProgram()!;
    for (const [type, src] of [
      [gl.VERTEX_SHADER, VERT],
      [gl.FRAGMENT_SHADER, FRAG],
    ] as const) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.bindAttribLocation(program, 0, "p");
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { colors, dots } = variants[variant];
    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform3fv(u("c"), colors.flatMap(hexToRgb));
    gl.uniform1f(u("dots"), dots);
    const res = u("r");
    const time = u("t");
    const mouseLoc = u("m");
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // mouse in canvas uv space, eased toward the pointer each frame
    const mouse = [-1, -1];
    const target = [-1, -1];
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target[0] = (e.clientX - rect.left) / rect.width;
      target[1] = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove);

    let frame = 0;
    const render = (ms: number) => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      mouse[0] += (target[0] - mouse[0]) * 0.04;
      mouse[1] += (target[1] - mouse[1]) * 0.04;
      gl.uniform2f(res, w, h);
      gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
      gl.uniform1f(time, ms / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
};

export default ShaderGradient;
