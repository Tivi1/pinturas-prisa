"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";

const TABS = [
  { id: "tabComedor", label: "Comedor, recámara o sala" },
  { id: "tabBano", label: "Baño" },
  { id: "tabTerraza", label: "Fachada, balcón o terraza" },
  { id: "tabJardin", label: "Jardín y patio" },
];

const RUGOSIDAD_FACTORS: Record<string, number> = {
  liso: 1,
  semiliso: 0.75,
  rustico: 0.5,
};

const ESPACIO_CONFIG: Record<
  string,
  { label: string; producto: string; rendimiento: number; imagen: string; url: string }
> = {
  tabComedor: {
    label: "Comedor, recámara y sala",
    producto: "Rivinol 7",
    rendimiento: 6,
    imagen: "https://prisa.mx/wp-content/uploads/2025/07/producto-rivinol-7.png",
    url: "https://prisa.mx/producto/rivinol-7/",
  },
  tabBano: {
    label: "Baño",
    producto: "Colorex BA",
    rendimiento: 6,
    imagen: "https://prisa.mx/wp-content/uploads/2025/07/producto-colorex®-base-agua.png",
    url: "https://prisa.mx/producto/esmalte-colorex-base-agua/",
  },
  tabTerraza: {
    label: "Fachadas, balcones y terrazas",
    producto: "Poliprisa Supreme",
    rendimiento: 5,
    imagen: "https://prisa.mx/wp-content/uploads/2025/07/producto-poliprisa®-premium.webp",
    url: "https://prisa.mx/producto/poliprisa-supreme/",
  },
  tabJardin: {
    label: "Jardines y patios",
    producto: "Poliprisa Premium",
    rendimiento: 5,
    imagen: "https://prisa.mx/wp-content/uploads/2025/07/producto-poliprisa®-premium.png",
    url: "https://prisa.mx/producto/poliprisa-premium/",
  },
};

interface CalcResult {
  producto: string;
  rendimiento: number;
  imagen: string;
  url: string;
  litros: number;
}

export default function CalculadoraPrisaPage() {
  const [activeTab, setActiveTab] = useState("tabComedor");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Confetti state
  const confettiRef = useRef<
    Array<{
      x: number; y: number; vx: number; vy: number;
      w: number; h: number; rot: number; scaleY: number;
      rmod: number; colorF: string; colorB: string;
    }>
  >([]);
  const sequinsRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string }>
  >([]);

  const filledCount = [width, length, height, superficie].filter((v) => v !== "").length;
  const progress = filledCount / 4;
  const circumference = 2 * Math.PI * 115;
  const lataFillY = 135 * (1 - progress);
  const canCalculate = filledCount === 4;

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setWidth("");
    setLength("");
    setHeight("");
    setSuperficie("");
    setShowResult(false);
    setResult(null);
  };

  function randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const initBurst = () => {
    if (!canvasRef.current) return;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;
    const colors = [
      { front: "#CC0033", back: "#003366" },
      { front: "#003366", back: "#FF9900" },
      { front: "#FF9900", back: "#CC0033" },
    ];
    confettiRef.current = [];
    sequinsRef.current = [];
    for (let i = 0; i < 30; i++) {
      const c = colors[Math.floor(randomRange(0, colors.length))];
      confettiRef.current.push({
        x: randomRange(cw / 2 - 300, cw / 2 + 300),
        y: randomRange(ch / 2, ch / 2 - 250),
        vx: randomRange(-9, 9),
        vy: -randomRange(6, 11),
        w: randomRange(12, 20),
        h: randomRange(18, 30),
        rot: randomRange(0, Math.PI * 2),
        scaleY: 1,
        rmod: randomRange(0, 99),
        colorF: c.front,
        colorB: c.back,
      });
    }
    for (let i = 0; i < 15; i++) {
      const c = colors[Math.floor(randomRange(0, colors.length))];
      sequinsRef.current.push({
        x: randomRange(cw / 2 - 300, cw / 2 + 300),
        y: randomRange(ch / 2, ch / 2 - 200),
        vx: randomRange(-6, 6),
        vy: randomRange(-8, -12),
        r: randomRange(3, 8),
        color: c.back,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const ctx = canvas.getContext("2d")!;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current.forEach((c) => {
        c.vx -= c.vx * 0.075;
        c.vy = Math.min(c.vy + 0.3, 3);
        c.vx += (Math.random() > 0.5 ? 1 : -1) * Math.random();
        c.x += c.vx;
        c.y += c.vy;
        c.scaleY = Math.cos((c.y + c.rmod) * 0.09);
        const w = c.w * 1, h = c.h * c.scaleY;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.fillStyle = c.scaleY > 0 ? c.colorF : c.colorB;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      });

      sequinsRef.current.forEach((s) => {
        s.vx -= s.vx * 0.075;
        s.vy += 0.3;
        s.x += s.vx;
        s.y += s.vy;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(0, 0, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      confettiRef.current = confettiRef.current.filter((c) => c.y < canvas.height);
      sequinsRef.current = sequinsRef.current.filter((s) => s.y < canvas.height);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Trigger confetti burst when all 4 fields filled
  useEffect(() => {
    if (filledCount === 4) {
      initBurst();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filledCount]);

  const handleCalculate = () => {
    const a = parseFloat(width);
    const l = parseFloat(length);
    const h = parseFloat(height);
    if (isNaN(a) || isNaN(l) || isNaN(h) || !superficie) return;

    const factor = RUGOSIDAD_FACTORS[superficie];
    const config = ESPACIO_CONFIG[activeTab];
    const areaWalls = 2 * h * (a + l);
    const areaCeil = a * l;
    const totalArea = areaWalls + areaCeil;
    const litros = totalArea / (config.rendimiento * factor);

    setResult({ ...config, litros });
    setShowResult(true);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: "#003366",
            paddingTop: "75px",
            paddingBottom: "75px",
            paddingLeft: "40px",
            paddingRight: "40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: "60px",
              color: "#ffffff",
              margin: "0 0 10px",
            }}
          >
            Calculadora PRISA®
          </h1>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "19px",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Calcula cuánta pintura requieres para renovar tu espacio
          </p>
        </section>

        {/* Calculator Section */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "40px",
            paddingRight: "40px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "46px",
              fontWeight: 800,
              lineHeight: "56px",
              color: "#FF9900",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Selecciona el espacio a renovar y sus medidas.
          </h2>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0px",
                padding: "5px",
                borderRadius: "40px",
                boxShadow: "0 0 1px 0 rgba(0,51,102,0.1), 0 4px 13px 0 rgba(0,51,102,0.15)",
                backgroundColor: "#fff",
                overflowX: "auto",
                maxWidth: "max-content",
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    padding: "15px 35px",
                    borderRadius: "40px",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s, color 0.2s",
                    backgroundColor: activeTab === tab.id ? "#003366" : "#ffffff",
                    color: activeTab === tab.id ? "#ffffff" : "#003366",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            {/* Form Column */}
            <div style={{ width: "40%", flexShrink: 0 }}>
              <form
                id="paintCalc"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  maxWidth: "400px",
                  color: "#003366",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { id: "width", label: "Ancho (metros):", value: width, setter: setWidth },
                  { id: "length", label: "Largo (metros):", value: length, setter: setLength },
                  { id: "height", label: "Alto (metros):", value: height, setter: setHeight },
                ].map((field) => (
                  <div key={field.id} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <label
                      htmlFor={field.id}
                      style={{ color: "#737373", width: "40%", fontSize: "16px", fontWeight: 700 }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="number"
                      id={field.id}
                      min="0"
                      step="0.01"
                      required
                      value={field.value}
                      onChange={(e) => {
                        field.setter(e.target.value);
                        setShowResult(false);
                        setResult(null);
                      }}
                      style={{
                        width: "60%",
                        padding: "10px 15px",
                        border: "1px solid #737373",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <label
                    htmlFor="superficie"
                    style={{ color: "#737373", width: "40%", fontSize: "16px", fontWeight: 700 }}
                  >
                    Tipo de superficie:
                  </label>
                  <select
                    id="superficie"
                    value={superficie}
                    onChange={(e) => {
                      setSuperficie(e.target.value);
                      setShowResult(false);
                      setResult(null);
                    }}
                    required
                    style={{
                      width: "60%",
                      padding: "10px 40px 10px 15px",
                      border: "1px solid #737373",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      backgroundColor: "white",
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 15px center",
                      backgroundSize: "0.9em",
                      outline: "none",
                    }}
                  >
                    <option value="" disabled>
                      Selecciona...
                    </option>
                    <option value="liso">Liso</option>
                    <option value="semiliso">Semiliso</option>
                    <option value="rustico">Rústico</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                  style={{
                    width: "100%",
                    padding: "23px 0",
                    marginTop: "10px",
                    border: "none",
                    borderRadius: "100px",
                    fontSize: "16px",
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: canCalculate ? "pointer" : "not-allowed",
                    backgroundColor: canCalculate ? "#003366" : "#cccccc",
                    color: canCalculate ? "#ffffff" : "#003366",
                    opacity: canCalculate ? 1 : 0.7,
                    transition: "background 0.2s",
                  }}
                >
                  Calcular
                </button>
              </form>
            </div>

            {/* Visual Column */}
            <div
              style={{
                width: "60%",
                position: "relative",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Canvas for confetti */}
              <canvas
                ref={canvasRef}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 9999,
                  display: showResult ? "none" : "block",
                }}
              />

              {/* Paint can + circle progress (when not showing result) */}
              {!showResult && (
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Circular progress */}
                  <div style={{ position: "relative", width: "450px", height: "450px" }}>
                    <svg
                      width="450"
                      height="450"
                      viewBox="-31.25 -31.25 312.5 312.5"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "rotate(-90deg)", display: "block" }}
                    >
                      <circle r="115" cx="125" cy="125" fill="transparent" stroke="#eee" strokeWidth="10" />
                      <circle
                        r="115"
                        cx="125"
                        cy="125"
                        fill="transparent"
                        stroke="#003366"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={circumference * (1 - progress)}
                        style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
                      />
                      <text
                        x="50%"
                        y="50%"
                        fill="#003366"
                        fontSize="60"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
                      >
                        {Math.round(progress * 100)}%
                      </text>
                    </svg>

                    {/* Paint can SVG centered inside the circle */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <svg
                        width="119.68"
                        height="149.99"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Capa 2"
                      >
                        <defs>
                          <style>{`.cls-1{fill:#FF9900}.cls-1,.cls-2,.cls-3{stroke-width:0px}.cls-2{fill:#fff}.cls-3{fill:#036}`}</style>
                          <clipPath id="paint-filler-mask">
                            <path d="m13.22,141.32c18.59,12 57.08,4.54 77.9,4.54c10.13,0 25.54,-1.54 28.56,-19.3l-2,-88.3c-9.62,-4.9 -11.25,-7.31 -28.87,0.17c-17.62,7.49 -29.97,-9.82 -57.7,-9.82c-14.94,0 -24.52,3.21 -31.11,10.74l0,93.59c4,2.49 4.45,7.09 13.22,8.4l0,-0.01l0,-0.01z" />
                          </clipPath>
                        </defs>
                        <g>
                          <g clipPath="url(#paint-filler-mask)" transform="translate(115.512 -7.4141) matrix(0.975113 0 0 1.15757 -113.612 -14.559)">
                            <path
                              className="cls-1"
                              d="m3.45,29.4c26.55,-7.36 81.55,5.96 112.79,-0.43l0,113.73l-113.26,4.5l0.47,-117.8z"
                              style={{ transform: `translateY(${lataFillY}px)`, transition: "transform 0.6s ease-in-out" }}
                            />
                          </g>
                          <g>
                            <path d="m0.45,137.46c39.68,10 77.46,10.95 119.05,0l0,11.9l-119.05,0l0,-11.9z" fill="#ffffff" />
                            <path className="cls-2" d="m59.84,28.62c-14.94,0 -29.02,-1.19 -39.64,-3.34c-12.62,-2.56 -18.5,-5.98 -18.5,-10.76s5.88,-8.2 18.5,-10.76c10.62,-2.16 24.7,-3.35 39.64,-3.35s29.02,1.19 39.64,3.34c12.62,2.56 18.5,5.98 18.5,10.76s-5.88,8.2 -18.5,10.76c-10.62,2.16 -24.7,3.34 -39.64,3.34l0,0.01zm52.39,-13.95l0,0l0,0z" />
                            <path className="cls-3" d="m59.84,29.04c-15.38,0 -29.87,-1.22 -40.8,-3.44c-12.99,-2.64 -19.04,-6.16 -19.04,-11.08s6.05,-8.44 19.04,-11.08c10.93,-2.22 25.42,-3.44 40.8,-3.44s29.87,1.22 40.8,3.44c12.99,2.64 19.04,6.16 19.04,11.08s-6.05,8.44 -19.04,11.08c-10.93,2.22 -25.42,3.44 -40.8,3.44zm-53.83,-14.52c1.68,2.65 18.75,8.57 53.84,8.57s52.16,-5.92 53.84,-8.57c-1.68,-2.65 -18.75,-8.57 -53.84,-8.57s-52.17,5.91 -53.84,8.57zm107.75,0.16l0,0l0,0z" />
                            <g>
                              <path className="cls-3" d="m15.64,72.17l7.14,0c4.21,0 6.94,2.23 6.94,6.04c0,4.05 -3.03,6.19 -7.17,6.19l-2.29,0l0,4.91l-4.62,0l0,-17.13l0,-0.01zm6.8,8.54c1.65,0 2.65,-0.93 2.65,-2.23l0,-0.05c0,-1.48 -0.99,-2.26 -2.67,-2.26l-2.17,0l0,4.54l2.19,0z" />
                              <path className="cls-3" d="m31.67,72.17l7.93,0c2.55,0 4.32,0.69 5.43,1.87c1.02,1.08 1.55,2.52 1.47,4l0,0.05c0.1,2.3 -1.28,4.42 -3.43,5.27l3.97,5.99l-5.38,0l-3.36,-5.2l-2.03,0l0,5.2l-4.62,0l0,-17.17l0,0l0.02,-0.01zm7.66,8.24c1.58,0 2.48,-0.78 2.48,-2.04l0,-0.05c0,-1.35 -0.94,-2.04 -2.5,-2.04l-3.03,0l0,4.12l3.05,0l0,0.01z" />
                              <path className="cls-3" d="m53.53,72.17l-4.65,0l0,17.17l4.65,0l0,-17.17z" />
                              <path className="cls-3" d="m55.33,86.79l2.57,-3.17c1.49,1.32 3.41,2.06 5.41,2.09c1.24,0 1.88,-0.45 1.88,-1.18l0,-0.06c0,-0.71 -0.54,-1.1 -2.82,-1.64c-3.56,-0.84 -6.29,-1.87 -6.29,-5.4c0,-3.2 2.45,-5.49 6.45,-5.49c2.49,-0.09 4.92,0.72 6.86,2.28l-2.27,3.28c-1.35,-1.04 -2.99,-1.63 -4.69,-1.69c-1.13,0 -1.67,0.5 -1.67,1.11l0,0.05c0,0.78 0.57,1.13 2.88,1.66c3.84,0.86 6.22,2.14 6.22,5.35l0,0.05c0,3.5 -2.69,5.61 -6.75,5.61c-2.86,0.07 -5.65,-0.93 -7.81,-2.8" />
                              <path className="cls-3" d="m78.87,71.88l-2.29,4.46l4.3,8.35l0.69,1.35l1.7,3.31l4.59,0l-8.99,-17.46l0,-0.01z" />
                              <path className="cls-3" d="m77.03,84.69l0.92,-1.78l-2.37,-4.62l-5.69,11.05l4.75,0l0.46,-0.89l5.71,0l-1.93,-3.77l-1.84,0l-0.01,0.01z" />
                              <path className="cls-3" d="m98.73,89.34l-8.67,0l-9.26,-17.46l8.67,0l9.26,17.46z" />
                              <path className="cls-3" d="m104.05,89.34l-3.66,0l-9.26,-17.46l3.66,0l9.26,17.46z" />
                            </g>
                            <path className="cls-3" d="m59.84,149.99c-15.38,0 -29.87,-1.22 -40.8,-3.44c-12.99,-2.64 -19.04,-6.16 -19.04,-11.08l0,-120.95c0,-1.64 1.33,-2.97 2.97,-2.97s2.91,1.27 2.97,2.86c0.46,0.88 4.08,3.46 15.88,5.67c10.35,1.94 23.85,3.01 38.01,3.01s27.66,-1.07 38.02,-3.01c11.81,-2.21 15.43,-4.8 15.88,-5.67c0.06,-1.59 1.37,-2.86 2.97,-2.86s2.97,1.33 2.97,2.97l0,120.95c0,4.92 -6.05,8.44 -19.04,11.08c-10.93,2.22 -25.42,3.44 -40.8,3.44l0.01,0zm-53.89,-14.63c0.46,0.88 4.09,3.46 15.88,5.67c10.35,1.94 23.85,3.01 38.02,3.01s27.66,-1.07 38.02,-3.01c11.79,-2.21 15.42,-4.79 15.88,-5.67l0,-113.75c-3.1,1.53 -7.44,2.84 -13.09,3.99c-10.93,2.22 -25.42,3.44 -40.8,3.44s-29.87,-1.22 -40.8,-3.44c-5.65,-1.15 -9.99,-2.46 -13.09,-3.99l0,113.76l-0.02,-0.01z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Result Panel */}
              {showResult && result && (
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    animation: "fadeIn 0.4s ease",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "24px",
                      color: "#FF9900",
                      marginBottom: "20px",
                    }}
                  >
                    Producto recomendado
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <div style={{ width: "35%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.imagen}
                        alt={result.producto}
                        style={{ maxWidth: "150px", height: "auto" }}
                      />
                    </div>
                    <div style={{ width: "65%", textAlign: "left" }}>
                      <h3
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "#0b3a56",
                          marginBottom: "12px",
                        }}
                      >
                        {result.producto}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#000",
                          marginBottom: "8px",
                        }}
                      >
                        Se necesitan aproximadamente{" "}
                        <strong>{result.litros.toFixed(2)} L</strong> de pintura para cubrir el
                        área a dos manos.
                      </p>
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#000",
                          marginBottom: "16px",
                        }}
                      >
                        Esta pintura ofrece un rendimiento de{" "}
                        <strong>{result.rendimiento} m²/L</strong>
                      </p>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                          backgroundColor: "transparent",
                          color: "#003366",
                          padding: "12px 20px",
                          borderRadius: "100px",
                          border: "1px solid #003366",
                          textDecoration: "none",
                          transition: "all 0.3s",
                        }}
                      >
                        Ver producto
                      </a>
                    </div>
                  </div>
                  <p
                    style={{
                      paddingTop: "20px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 300,
                      lineHeight: "13px",
                      color: "#878787",
                    }}
                  >
                    El resultado es un cálculo aproximado. Para determinar la cantidad exacta de
                    pintura, consulta con tu tienda PRISA®. Factores como el tipo de muro, el
                    fondo, la técnica de aplicación y la herramienta utilizada pueden afectar el
                    rendimiento real de la pintura.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Store Locator Section */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              gap: "26px",
              alignItems: "stretch",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            {/* Text side */}
            <div
              style={{
                width: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  width: "100%",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#003366",
                    marginBottom: "10px",
                  }}
                >
                  Localiza tu tienda
                </h4>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "40px",
                    fontWeight: 700,
                    lineHeight: "50px",
                    color: "#FF9900",
                    marginBottom: "15px",
                  }}
                >
                  ¿Dónde comprar productos PRISA®?
                </h2>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19px",
                    color: "#737373",
                    marginBottom: "10px",
                  }}
                >
                  Encuentra tu tienda PRISA® más cercana y recibe asesoría personalizada de
                  nuestros expertos.
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19px",
                    color: "#737373",
                    marginBottom: "20px",
                  }}
                >
                  Contamos con una amplia red de distribuidores en todo México, listos para
                  brindarte soluciones especializadas en pintura y recubrimientos.
                </p>
                <div>
                  <Link
                    href="/localiza-tu-tienda"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#003366",
                      color: "#ffffff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      padding: "14px 24px",
                      borderRadius: "100px",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#store-clip)">
                        <path
                          d="M17.0755 2.97671C13.0552 -1.0308 6.87323 -0.951902 2.95939 2.96795C-0.950684 6.88529 -1.02458 13.0431 2.9644 17.0606C6.91956 21.0443 13.2067 20.9091 17.0642 17.0782C20.8841 13.2572 21.0657 6.95668 17.0742 2.97797L17.0755 2.97671ZM14.7159 12.2428C14.7134 12.8928 14.4629 13.241 13.9332 13.3487C13.476 13.4413 13.0452 13.1971 12.8974 12.7563C12.8373 12.5772 12.8147 12.3931 12.8147 12.204C12.816 11.112 12.8147 10.0187 12.8097 8.92662C12.8097 8.84021 12.8636 8.71497 12.7546 8.67615C12.6532 8.63983 12.6031 8.76382 12.5405 8.82643C11.6187 9.74566 10.6981 10.6661 9.7776 11.5866C8.86458 12.4996 7.95282 13.4138 7.03729 14.3255C6.73295 14.6286 6.39981 14.8164 5.94518 14.6448C5.40663 14.442 5.16742 13.8058 5.46425 13.3123C5.55066 13.1683 5.65837 13.0443 5.77735 12.9254C7.57584 11.1308 9.37182 9.33363 11.1665 7.53526C11.2417 7.46012 11.397 7.395 11.3419 7.27352C11.2905 7.16206 11.134 7.21466 11.025 7.21341C9.92163 7.20965 8.81699 7.21341 7.7136 7.20715C7.12121 7.20339 6.77554 6.93163 6.67659 6.41566C6.58266 5.92599 6.87823 5.46764 7.36418 5.35618C7.77497 5.26225 8.19454 5.30984 8.60909 5.30608C10.2435 5.29356 11.8767 5.29356 13.5111 5.29105C14.3202 5.2898 14.7284 5.69181 14.7272 6.49456C14.7247 8.41065 14.7209 10.3255 14.7134 12.2416L14.7159 12.2428Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="store-clip">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Localiza tu tienda
                  </Link>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div
              style={{
                width: "55%",
                minHeight: "300px",
                backgroundImage:
                  "url('https://prisa.mx/wp-content/uploads/2025/06/img_localizaTienda.webp')",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "40px",
              }}
            />
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
