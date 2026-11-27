import type { QuestionFigure } from "@/lib/simulation-bank";

const COLORS = ["#102B50", "#F2B705", "#2E8B57", "#C0392B", "#6C5CE7"];
const fmt = (n: number) => n.toLocaleString("es-CO");

/** Tabla o gráfico de la situación. Cada gráfico lleva su descripción accesible con los datos. */
export function QuestionFigureView({ f }: { f: QuestionFigure }) {
  return <figure className="qfig">
    {f.kind === "table" && <div className="qfig-scroll"><table className={`qfig-table${f.head.length > 6 ? " dense" : ""}`}>
      <thead><tr>{f.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
      <tbody>{f.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row" className={c.length > 22 ? "txt" : undefined}>{c}</th> : <td key={j} className={c.length > 14 ? "txt" : undefined}>{c}</td>)}</tr>)}</tbody>
    </table></div>}
    {f.kind === "line" && <LineChart f={f} />}
    {f.kind === "pie" && <PieChart f={f} />}
    {f.kind === "plan" && <Plan f={f} />}
    <figcaption>{f.caption}</figcaption>
  </figure>;
}

function LineChart({ f }: { f: Extract<QuestionFigure, { kind: "line" }> }) {
  const W = 340, H = 230, L = 52, R = 14, T = 14, B = 44;
  const xMax = Math.max(...f.points.map(p => p[0])), xMin = Math.min(...f.points.map(p => p[0]));
  const x = (v: number) => L + ((v - xMin) / (xMax - xMin || 1)) * (W - L - R);
  const y = (v: number) => T + (1 - v / f.yMax) * (H - T - B);
  const yt: number[] = []; for (let v = 0; v <= f.yMax; v += f.yStep) yt.push(v);
  const desc = `${f.yLabel} según ${f.xLabel}: ` + f.points.map(p => `${p[0]}, ${fmt(p[1])}`).join("; ");
  const xl = (v: number) => (v >= 1000 && v <= 2100 ? String(v) : fmt(v));
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={desc} className="qfig-svg">
    {yt.map(v => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e3e9f2" /><text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#41546e">{fmt(v)}</text></g>)}
    {f.points.map(p => <text key={p[0]} x={x(p[0])} y={H - B + 16} textAnchor="middle" fontSize="11" fill="#41546e">{xl(p[0])}</text>)}
    <line x1={L} x2={L} y1={T} y2={H - B} stroke="#41546e" /><line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="#41546e" />
    <polyline points={f.points.map(p => `${x(p[0])},${y(p[1])}`).join(" ")} fill="none" stroke="#102B50" strokeWidth="3" strokeLinejoin="round" />
    {f.points.map(p => <circle key={p[0]} cx={x(p[0])} cy={y(p[1])} r="4.5" fill="#F2B705" stroke="#102B50" strokeWidth="1.5" />)}
    <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#102B50">{f.xLabel}</text>
    <text x={14} y={(T + H - B) / 2} textAnchor="middle" fontSize="12" fontWeight="700" fill="#102B50" transform={`rotate(-90 14 ${(T + H - B) / 2})`}>{f.yLabel}</text>
  </svg>;
}

function PieChart({ f }: { f: Extract<QuestionFigure, { kind: "pie" }> }) {
  const total = f.slices.reduce((a, s) => a + s[1], 0);
  let acc = 0;
  const arc = (v: number) => { const a0 = (acc / total) * 2 * Math.PI - Math.PI / 2; acc += v; const a1 = (acc / total) * 2 * Math.PI - Math.PI / 2;
    const r = 80, cx = 90, cy = 90, big = a1 - a0 > Math.PI ? 1 : 0;
    return `M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${big} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z`; };
  const desc = f.slices.map(s => `${s[0]}: ${s[1]} %`).join("; ");
  return <div className="qfig-pie">
    <svg viewBox="0 0 180 180" role="img" aria-label={desc} className="qfig-svg qfig-pie-svg">{f.slices.map((s, i) => <path key={s[0]} d={arc(s[1])} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth="2" />)}</svg>
    <ul className="qfig-legend" aria-hidden="true">{f.slices.map((s, i) => <li key={s[0]}><span style={{ background: COLORS[i % COLORS.length] }} />{s[0]} <strong>{s[1]} %</strong></li>)}</ul>
  </div>;
}

function Plan({ f }: { f: Extract<QuestionFigure, { kind: "plan" }> }) {
  const k = 50, ox = 76, oy = 24, w = f.w * k, h = f.h * k;
  return <svg viewBox={`0 0 ${w + 100} ${h + 64}`} role="img" aria-label={`Rectángulo de ${f.w} ${f.unit} de largo por ${f.h} ${f.unit} de ancho`} className="qfig-svg qfig-plan">
    <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#e3e9f2" /></pattern></defs>
    <rect x={ox} y={oy} width={w} height={h} fill="url(#grid)" stroke="#102B50" strokeWidth="3" />
    <text x={ox + w / 2} y={oy + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#102B50">{f.label}</text>
    <line x1={ox} x2={ox + w} y1={oy + h + 18} y2={oy + h + 18} stroke="#41546e" />
    <text x={ox + w / 2} y={oy + h + 36} textAnchor="middle" fontSize="13" fill="#102B50" fontWeight="700">{f.w} {f.unit}</text>
    <line x1={ox - 16} x2={ox - 16} y1={oy} y2={oy + h} stroke="#41546e" />
    <text x={ox - 22} y={oy + h / 2 + 4} textAnchor="end" fontSize="13" fill="#102B50" fontWeight="700">{f.h} {f.unit}</text>
  </svg>;
}
