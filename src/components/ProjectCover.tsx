import { ReactNode, useId } from "react";
import "./styles/ProjectCover.css";

/*
 * Code-drawn cover art for each project. Every scene is line art in the site
 * accent (currentColor), so covers recolor with the accent switcher, stay
 * sharp at any size and weigh a few KB instead of ~2.5 MB per PNG.
 * Canvas: 480 × 300.
 */

const W = "#eae5ec"; // light ink for secondary strokes/text
const PANEL = "#151118";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const T = ({
  x,
  y,
  children,
  size = 10,
  fill = W,
  opacity = 0.6,
  anchor = "start",
  weight = 400,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={fill}
    fillOpacity={opacity}
    textAnchor={anchor}
    fontFamily={MONO}
    fontWeight={weight}
  >
    {children}
  </text>
);

/** Detection box with a label tab, used by the computer-vision covers. */
const BBox = ({
  x,
  y,
  w,
  h,
  label,
  warn = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  warn?: boolean;
}) => (
  <g className={warn ? "pc-blink" : undefined}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={warn ? "none" : "currentColor"}
      fillOpacity={0.06}
      stroke={warn ? W : "currentColor"}
      strokeWidth={1.5}
      strokeDasharray={warn ? "5 4" : undefined}
      strokeOpacity={warn ? 0.7 : 1}
    />
    <rect x={x - 0.75} y={y - 16} width={label.length * 6.2 + 10} height={16} fill={warn ? W : "currentColor"} fillOpacity={warn ? 0.85 : 1} />
    <T x={x + 5} y={y - 4.5} size={9.5} fill="#0b080c" opacity={1} weight={600}>
      {label}
    </T>
  </g>
);

const hex = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

/* ---------------- Scenes ---------------- */

const SkillSync = () => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} opacity={0.35 + i * 0.16}>
        <rect x={52 + i * 7} y={70 + i * 7} width={74} height={96} rx={6} fill={PANEL} stroke={W} strokeOpacity={0.3} />
      </g>
    ))}
    <circle cx={102} cy={124} r={9} fill="none" stroke="currentColor" strokeWidth={1.5} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={88} y={142 + i * 8} width={i % 2 ? 32 : 44} height={3} rx={1.5} fill={W} fillOpacity={0.35} />
    ))}
    <T x={52} y={204} size={9}>500 applicants</T>
    <path d="M168 92 L238 122 L238 178 L168 208 Z" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeOpacity={0.7} />
    {[110, 150, 190].map((y) => (
      <path key={y} className="pc-flow" d={`M170 ${y} L236 150`} stroke="currentColor" strokeOpacity={0.6} strokeDasharray="3 5" />
    ))}
    <T x={203} y={230} size={9} anchor="middle">anonymize · RAG</T>
    {[92, 85, 78, 64].map((score, i) => (
      <g key={score} transform={`translate(262 ${78 + i * 38})`}>
        <rect width={180} height={28} rx={6} fill={i === 0 ? "currentColor" : PANEL} fillOpacity={i === 0 ? 0.95 : 1} stroke={W} strokeOpacity={i === 0 ? 0 : 0.18} />
        <T x={12} y={18} size={10} fill={i === 0 ? "#0b080c" : W} opacity={i === 0 ? 1 : 0.7} weight={i === 0 ? 600 : 400}>
          #{i + 1}
        </T>
        <rect x={40} y={11} width={score * 1.05} height={6} rx={3} fill={i === 0 ? "#0b080c" : "currentColor"} fillOpacity={i === 0 ? 0.6 : 0.5} />
        <T x={170} y={18} size={10} anchor="end" fill={i === 0 ? "#0b080c" : W} opacity={i === 0 ? 1 : 0.7}>
          {score}%
        </T>
      </g>
    ))}
  </g>
);

const StickyNet = () => {
  const c = [250, 150] as const;
  const ring = Array.from({ length: 6 }, (_, k) => polar(c[0], c[1], 52, 30 + k * 60));
  const outer = Array.from({ length: 12 }, (_, k) => polar(c[0], c[1], k % 2 ? 90 : 104, k * 30));
  return (
    <g>
      {outer.map(([x, y], k) => (
        <polygon key={`o${k}`} points={hex(x, y, 30)} fill="none" stroke={W} strokeOpacity={0.12} />
      ))}
      {ring.map(([x, y], k) => (
        <polygon key={k} points={hex(x, y, 30)} fill="none" stroke="currentColor" strokeOpacity={0.45} />
      ))}
      <polygon className="pc-pulse" points={hex(c[0], c[1], 30)} fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeWidth={2} />
      <path d="M236 140 h28 a5 5 0 0 1 5 5 v12 a5 5 0 0 1 -5 5 h-18 l-8 7 v-7 h-2 a5 5 0 0 1 -5 -5 v-12 a5 5 0 0 1 5 -5z" fill="none" stroke="currentColor" strokeWidth={1.5} />
      <T x={250} y={155} size={11} anchor="middle" fill="currentColor" opacity={1}>
        ₹?
      </T>
      {[
        ["URGENT: KYC expired", 62],
        ["You won ₹50,000!", 112],
        ["Verify your UPI now", 162],
      ].map(([msg, y]) => (
        <g key={msg as string}>
          <rect x={24} y={y as number} width={124} height={24} rx={8} fill={PANEL} stroke={W} strokeOpacity={0.25} />
          <T x={34} y={(y as number) + 15.5} size={9}>{msg}</T>
          <path className="pc-flow" d={`M150 ${(y as number) + 12} Q 190 ${(y as number) + 12} 222 150`} fill="none" stroke={W} strokeOpacity={0.35} strokeDasharray="3 5" />
        </g>
      ))}
      {["UPI ID", "Bank A/C", "Phish URL"].map((t, i) => (
        <g key={t} transform={`translate(360 ${92 + i * 40})`}>
          <rect width={98} height={26} rx={13} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.7} />
          <path d="M12 13 l4 4 l8 -9" fill="none" stroke="currentColor" strokeWidth={1.8} />
          <T x={32} y={17} size={10} fill={W} opacity={0.85}>{t}</T>
        </g>
      ))}
    </g>
  );
};

const MARag = () => {
  const agents: [string, number, number][] = [
    ["FINANCIAL", 380, 78],
    ["LEGAL", 408, 150],
    ["OPERATIONAL", 380, 222],
  ];
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={40 + i * 6} y={96 + i * 6} width={66} height={84} rx={5} fill={PANEL} stroke={W} strokeOpacity={0.25 + i * 0.12} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={68} y={128 + i * 9} width={i % 2 ? 26 : 40} height={3} rx={1.5} fill={W} fillOpacity={0.3} />
      ))}
      <T x={40} y={210} size={9}>10,000+ docs</T>
      <path className="pc-flow" d="M126 150 L202 150" stroke="currentColor" strokeDasharray="4 5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={140 + i * 14} y={128} width={9} height={9} rx={2} fill="currentColor" fillOpacity={0.25 + i * 0.15} />
      ))}
      <T x={140} y={124} size={8.5}>chunks → vectors</T>
      <circle className="pc-pulse" cx={240} cy={150} r={38} fill="currentColor" fillOpacity={0.15} stroke="currentColor" strokeWidth={2} />
      <T x={240} y={147} size={8.5} anchor="middle" opacity={0.9}>LangGraph</T>
      <T x={240} y={159} size={7.5} anchor="middle" opacity={0.6}>orchestrator</T>
      {agents.map(([name, x, y]) => (
        <g key={name}>
          <path className="pc-flow" d={`M278 150 Q ${x - 60} ${y} ${x - 20} ${y}`} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeDasharray="3 5" />
          <circle cx={x} cy={y} r={20} fill={PANEL} stroke="currentColor" strokeWidth={1.5} />
          <circle cx={x} cy={y} r={5} fill="currentColor" />
          <T x={x} y={y + 34} size={8.5} anchor="middle">{name}</T>
        </g>
      ))}
    </g>
  );
};

const LearnWeave = () => {
  const levels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
  const base = 258, h = 32, bottomW = 330, step = 46;
  return (
    <g>
      {levels.map((name, i) => {
        const wB = bottomW - i * step, wT = bottomW - (i + 1) * step;
        const yB = base - i * h, yT = yB - h + 3;
        const pts = `${240 - wB / 2},${yB} ${240 + wB / 2},${yB} ${240 + wT / 2},${yT} ${240 - wT / 2},${yT}`;
        const top = i === levels.length - 1;
        return (
          <g key={name}>
            <polygon points={pts} fill="currentColor" fillOpacity={top ? 0.9 : 0.05 + i * 0.07} stroke="currentColor" strokeOpacity={0.7} />
            <T x={240} y={yB - 11} size={top ? 9 : 10.5} anchor="middle" fill={top ? "#0b080c" : W} opacity={top ? 1 : 0.8} weight={top ? 600 : 400}>
              {name}
            </T>
          </g>
        );
      })}
      <T x={24} y={76} size={9}>PDF in</T>
      <rect x={24} y={84} width={50} height={64} rx={4} fill={PANEL} stroke={W} strokeOpacity={0.3} />
      <path className="pc-flow" d="M78 116 Q 120 116 130 180" fill="none" stroke={W} strokeOpacity={0.35} strokeDasharray="3 5" />
      <T x={456} y={76} size={9} anchor="end">quizzes · flashcards</T>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={398 + i * 6} y={84 + i * 6} width={50} height={34} rx={4} fill={PANEL} stroke="currentColor" strokeOpacity={0.4 + i * 0.2} />
      ))}
    </g>
  );
};

const PhishGuard = () => (
  <g>
    <rect x={40} y={52} width={330} height={196} rx={10} fill={PANEL} stroke={W} strokeOpacity={0.25} />
    <path d="M40 80 H370" stroke={W} strokeOpacity={0.15} />
    {[56, 68, 80].map((x) => (
      <circle key={x} cx={x} cy={66} r={3.5} fill={W} fillOpacity={0.3} />
    ))}
    <rect x={98} y={58} width={250} height={16} rx={8} fill="#0b080c" stroke={W} strokeOpacity={0.15} />
    <text x={110} y={70} fontSize={10} fontFamily={MONO} fill={W} fillOpacity={0.75}>
      https://paypa<tspan fill="currentColor" fillOpacity={1} fontWeight={700}>1</tspan>.com/login
    </text>
    <path className="pc-blink" d="M186 76 q2 3 4 0 q2 -3 4 0" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <rect x={130} y={110} width={150} height={20} rx={4} fill={W} fillOpacity={0.08} />
    <rect x={130} y={140} width={150} height={20} rx={4} fill={W} fillOpacity={0.08} />
    <rect x={130} y={172} width={70} height={22} rx={11} fill={W} fillOpacity={0.18} />
    <T x={165} y={186} size={9} anchor="middle" opacity={0.8}>Sign in</T>
    <T x={60} y={232} size={8.5} opacity={0.45}>*Hidden fee of ₹999/month applies</T>
    <path d="M60 236 H244" stroke="currentColor" strokeOpacity={0.7} strokeDasharray="2 3" />
    <g className="pc-pulse" transform="translate(392 150)">
      <path d="M0 -62 L46 -44 V0 C46 32 24 52 0 62 C-24 52 -46 32 -46 0 V-44 Z" fill="#0b080c" stroke="currentColor" strokeWidth={2} />
      <path d="M0 -62 L46 -44 V0 C46 32 24 52 0 62 C-24 52 -46 32 -46 0 V-44 Z" fill="currentColor" fillOpacity={0.14} />
      <path d="M0 -24 V8" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
      <circle cx={0} cy={22} r={3} fill="currentColor" />
    </g>
    <rect x={322} y={226} width={140} height={22} rx={11} fill="currentColor" />
    <T x={392} y={241} size={9.5} anchor="middle" fill="#0b080c" opacity={1} weight={600}>lookalike domain</T>
  </g>
);

const LatexAgent = () => (
  <g>
    {[
      ["sticky-net", 0.92],
      ["skill-sync", 0.88],
      ["m-a-rag", 0.79],
      ["chandas-ai", 0.41],
    ].map(([repo, rel], i) => (
      <g key={repo as string} transform={`translate(28 ${70 + i * 42})`} opacity={(rel as number) > 0.5 ? 1 : 0.4}>
        <rect width={126} height={30} rx={6} fill={PANEL} stroke={W} strokeOpacity={0.2} />
        <T x={10} y={13} size={9} opacity={0.8}>{repo}</T>
        <rect x={10} y={19} width={80} height={3} rx={1.5} fill={W} fillOpacity={0.12} />
        <rect x={10} y={19} width={80 * (rel as number)} height={3} rx={1.5} fill="currentColor" />
        <T x={116} y={22} size={8.5} anchor="end" fill="currentColor" opacity={1}>{(rel as number).toFixed(2)}</T>
        {(rel as number) > 0.5 && <path className="pc-flow" d="M128 15 L196 15" stroke="currentColor" strokeOpacity={0.5} strokeDasharray="3 5" />}
      </g>
    ))}
    <rect x={200} y={36} width={176} height={228} rx={4} fill="#f4f1f5" fillOpacity={0.94} />
    <rect x={250} y={50} width={76} height={6} rx={3} fill="#0b080c" fillOpacity={0.8} />
    <rect x={262} y={61} width={52} height={3} rx={1.5} fill="#0b080c" fillOpacity={0.35} />
    {[0, 1, 2].map((s) => (
      <g key={s} transform={`translate(214 ${80 + s * 60})`}>
        <rect width={44} height={4} rx={2} fill="#0b080c" fillOpacity={0.75} />
        <path d="M0 8 H148" stroke="#0b080c" strokeOpacity={0.25} />
        {[0, 1, 2, 3].map((l) => (
          <rect key={l} x={l % 2 ? 8 : 0} y={15 + l * 8} width={l === 3 ? 90 : 140} height={3} rx={1.5} fill="#0b080c" fillOpacity={0.28} />
        ))}
      </g>
    ))}
    <T x={392} y={92} size={9.5} fill="currentColor" opacity={1}>\section</T>
    <T x={392} y={106} size={9.5}>{"{Projects}"}</T>
    <rect x={392} y={210} width={70} height={24} rx={12} fill="currentColor" />
    <T x={427} y={226} size={9.5} anchor="middle" fill="#0b080c" opacity={1} weight={600}>1 page ✓</T>
    <T x={392} y={250} size={8.5}>ATS-safe PDF</T>
  </g>
);

const VerifyX = () => {
  const labels = ["IDENTITY", "EMPLOYER", "EDUCATION", "DOCUMENTS", "ADDRESS", "FRAUD"];
  return (
    <g>
      <circle cx={240} cy={150} r={104} fill="none" stroke={W} strokeOpacity={0.08} />
      {labels.map((l, i) => {
        const [x, y] = polar(240, 150, 104, i * 60);
        return (
          <g key={l}>
            <path className="pc-flow" d={`M240 150 L${x} ${y}`} stroke="currentColor" strokeOpacity={0.45} strokeDasharray="3 5" />
            <circle cx={x} cy={y} r={17} fill={PANEL} stroke="currentColor" strokeWidth={1.5} />
            <path d={`M${x - 6} ${y} l4 4 l8 -9`} fill="none" stroke="currentColor" strokeWidth={2} />
            <T x={x} y={y + (y > 150 ? 30 : -24)} size={8} anchor="middle">{l}</T>
          </g>
        );
      })}
      <rect x={198} y={122} width={84} height={56} rx={7} fill={PANEL} stroke="currentColor" strokeWidth={1.5} />
      <circle cx={218} cy={146} r={10} fill="currentColor" fillOpacity={0.3} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={234} y={136 + i * 9} width={i === 2 ? 22 : 36} height={3} rx={1.5} fill={W} fillOpacity={0.4} />
      ))}
      <T x={240} y={172} size={8} anchor="middle" fill="currentColor" opacity={1}>97% confidence</T>
    </g>
  );
};

const Neutralis = () => (
  <g>
    <rect x={30} y={56} width={150} height={52} rx={12} fill={PANEL} stroke={W} strokeOpacity={0.3} />
    <T x={44} y={78} size={9.5} opacity={0.8}>"Everyone agrees</T>
    <T x={44} y={93} size={9.5} opacity={0.8}>this is true."</T>
    <rect x={300} y={56} width={150} height={52} rx={12} fill="currentColor" fillOpacity={0.12} stroke="currentColor" />
    <T x={314} y={78} size={9.5} opacity={0.9}>What evidence</T>
    <T x={314} y={93} size={9.5} opacity={0.9}>would change that?</T>
    <path d="M240 96 V206" stroke={W} strokeOpacity={0.5} strokeWidth={2} />
    <path d="M206 206 H274" stroke={W} strokeOpacity={0.5} strokeWidth={2} />
    <g className="pc-sway">
      <path d="M168 118 L312 102" stroke="currentColor" strokeWidth={2} />
      <circle cx={240} cy={110} r={5} fill="currentColor" />
      <path d="M168 118 L148 160 M168 118 L188 160" stroke={W} strokeOpacity={0.35} />
      <path d="M144 160 Q168 176 192 160 Z" fill={W} fillOpacity={0.1} stroke={W} strokeOpacity={0.5} />
      <path d="M312 102 L292 144 M312 102 L332 144" stroke="currentColor" strokeOpacity={0.5} />
      <path d="M288 144 Q312 160 336 144 Z" fill="currentColor" fillOpacity={0.25} stroke="currentColor" />
      <T x={168} y={190} size={8.5} anchor="middle">bias</T>
      <T x={312} y={174} size={8.5} anchor="middle" fill="currentColor" opacity={1}>evidence</T>
    </g>
    <path d="M70 244 H410" stroke={W} strokeOpacity={0.2} strokeWidth={6} strokeLinecap="round" />
    <path d="M70 244 H318" stroke="currentColor" strokeOpacity={0.7} strokeWidth={6} strokeLinecap="round" />
    <circle cx={318} cy={244} r={7} fill="#0b080c" stroke="currentColor" strokeWidth={2} />
    <T x={70} y={232} size={8.5}>BIASED</T>
    <T x={410} y={232} size={8.5} anchor="end">BALANCED</T>
  </g>
);

const JobScraper = () => (
  <g>
    <circle cx={118} cy={150} r={74} fill={PANEL} stroke={W} strokeOpacity={0.25} />
    {Array.from({ length: 12 }, (_, i) => {
      const [x1, y1] = polar(118, 150, 64, i * 30);
      const [x2, y2] = polar(118, 150, i % 3 ? 58 : 52, i * 30);
      return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={W} strokeOpacity={0.5} strokeWidth={i % 3 ? 1 : 2} />;
    })}
    <path d={`M118 76 A74 74 0 0 1 ${polar(118, 150, 74, 120).join(" ")}`} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    <g className="pc-spin" style={{ transformOrigin: "118px 150px" }}>
      <path d="M118 150 L118 98" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
    </g>
    <path d="M118 150 L148 150" stroke={W} strokeWidth={2.5} strokeLinecap="round" />
    <circle cx={118} cy={150} r={4} fill="currentColor" />
    <T x={118} y={248} size={9} anchor="middle">every hour</T>
    {[
      ["ML Intern", "Bengaluru", true],
      ["SWE Intern", "Remote", true],
      ["Data Science Intern", "Chennai", false],
      ["AI Research Intern", "Hyderabad", false],
    ].map(([role, city, isNew], i) => (
      <g key={role as string} transform={`translate(222 ${66 + i * 44})`}>
        <rect width={232} height={34} rx={7} fill={PANEL} stroke={isNew ? "currentColor" : W} strokeOpacity={isNew ? 0.6 : 0.18} />
        <T x={12} y={15} size={10} opacity={0.85}>{role}</T>
        <T x={12} y={27} size={8.5} opacity={0.45}>{city} · LinkedIn</T>
        {isNew && (
          <>
            <rect x={186} y={10} width={36} height={14} rx={7} fill="currentColor" />
            <T x={204} y={20.5} size={8} anchor="middle" fill="#0b080c" opacity={1} weight={700}>NEW</T>
          </>
        )}
      </g>
    ))}
  </g>
);

// Indravajrā: ta ta ja ga ga  →  – – ∪ | – – ∪ | ∪ – ∪ | – | –
const INDRAVAJRA = [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1];
const GANAS: [string, number, number][] = [
  ["ta", 0, 3],
  ["ta", 3, 6],
  ["ja", 6, 9],
  ["ga", 9, 10],
  ["ga", 10, 11],
];

const ChandasAI = () => {
  const x0 = 34, cell = 38;
  return (
    <g>
      {INDRAVAJRA.map((guru, i) => (
        <g key={i} transform={`translate(${x0 + i * cell} 92)`}>
          <rect width={32} height={46} rx={6} fill={guru ? "currentColor" : PANEL} fillOpacity={guru ? 0.14 : 1} stroke="currentColor" strokeOpacity={guru ? 0.9 : 0.4} />
          {guru ? (
            <path d="M8 23 H24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
          ) : (
            <path d="M9 17 Q16 32 23 17" fill="none" stroke={W} strokeOpacity={0.8} strokeWidth={2.5} strokeLinecap="round" />
          )}
        </g>
      ))}
      {GANAS.map(([g, a, b], k) => {
        const xa = x0 + a * cell + 2, xb = x0 + (b - 1) * cell + 30;
        return (
          <g key={k}>
            <path d={`M${xa} 148 V154 H${xb} V148`} fill="none" stroke={W} strokeOpacity={0.4} />
            <T x={(xa + xb) / 2} y={168} size={10} anchor="middle" opacity={0.75}>{g}</T>
          </g>
        );
      })}
      <T x={34} y={80} size={9}>guru —  laghu ∪</T>
      <path
        className="pc-wave"
        d={Array.from({ length: 60 }, (_, i) => `${i ? "L" : "M"}${34 + i * 7} ${214 + Math.sin(i * 0.9) * (6 + (i % 5) * 2.5)}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.45}
      />
      <rect x={300} y={34} width={156} height={28} rx={14} fill="currentColor" />
      <T x={378} y={52} size={10} anchor="middle" fill="#0b080c" opacity={1} weight={600}>Indravajrā · 11 syllables</T>
    </g>
  );
};

const ChandasGame = () => {
  const tiles = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0];
  const solved = new Set([0, 1, 2, 6, 7, 8]);
  return (
    <g>
      <rect x={40} y={40} width={400} height={30} rx={8} fill={PANEL} stroke={W} strokeOpacity={0.18} />
      <T x={54} y={59} size={10} fill="currentColor" opacity={1} weight={600}>LVL 4</T>
      <T x={108} y={59} size={11} fill="currentColor" opacity={1}>★★★</T>
      <rect x={170} y={51} width={170} height={8} rx={4} fill={W} fillOpacity={0.1} />
      <rect className="pc-grow" x={170} y={51} width={118} height={8} rx={4} fill="currentColor" />
      <T x={426} y={59} size={10} anchor="end" opacity={0.8}>XP 1,240</T>
      {tiles.map((guru, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        const x = 96 + col * 60, y = 92 + row * 56;
        const done = solved.has(i);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width={48} height={44} rx={9} fill={done ? "currentColor" : PANEL} fillOpacity={done ? 0.85 : 1} stroke="currentColor" strokeOpacity={done ? 1 : 0.35} />
            {guru ? (
              <path d="M14 22 H34" stroke={done ? "#0b080c" : W} strokeOpacity={done ? 1 : 0.7} strokeWidth={3} strokeLinecap="round" />
            ) : (
              <path d="M16 16 Q24 32 32 16" fill="none" stroke={done ? "#0b080c" : W} strokeOpacity={done ? 1 : 0.7} strokeWidth={2.5} strokeLinecap="round" />
            )}
          </g>
        );
      })}
      <T x={404} y={128} size={9}>streak</T>
      <T x={404} y={150} size={20} fill="currentColor" opacity={1} weight={700}>12🔥</T>
    </g>
  );
};

const SafeSight = () => (
  <g>
    <path d="M30 252 H450" stroke={W} strokeOpacity={0.15} />
    {[60, 110, 400].map((x, i) => (
      <path key={x} d={`M${x} 252 V${120 + i * 20} h30 V252`} fill="none" stroke={W} strokeOpacity={0.08} />
    ))}
    {/* worker */}
    <g fill={W} fillOpacity={0.14} stroke={W} strokeOpacity={0.55}>
      <circle cx={220} cy={104} r={15} />
      <path d="M198 128 h44 l8 66 h-60 z" />
      <path d="M198 132 l-22 50 M242 132 l22 50" strokeWidth={8} strokeLinecap="round" />
      <path d="M208 194 v54 M232 194 v54" strokeWidth={10} strokeLinecap="round" />
    </g>
    <path d="M203 99 a17 15 0 0 1 34 0 z" fill="currentColor" fillOpacity={0.85} />
    <path d="M200 140 h40 M198 160 h44" stroke="currentColor" strokeWidth={4} />
    <BBox x={196} y={82} w={48} h={40} label="helmet 0.94" />
    <BBox x={190} y={128} w={60} h={66} label="vest 0.91" />
    <BBox x={258} y={168} w={26} h={26} label="no gloves" warn />
    {/* live chart */}
    <rect x={320} y={56} width={136} height={86} rx={8} fill={PANEL} stroke={W} strokeOpacity={0.2} />
    <T x={330} y={72} size={8.5}>violations / hr</T>
    {[14, 22, 10, 30, 18, 8, 26, 12, 6].map((h, i) => (
      <rect key={i} x={332 + i * 13} y={130 - h * 1.6} width={8} height={h * 1.6} rx={2} fill="currentColor" fillOpacity={0.3 + (i === 3 ? 0.6 : 0)} />
    ))}
    <rect className="pc-scan" x={30} y={40} width={420} height={2} fill="currentColor" fillOpacity={0.8} />
    <T x={30} y={60} size={8.5} fill="currentColor" opacity={0.9}>● CAM-02 LIVE</T>
  </g>
);

const SmartVision = () => (
  <g>
    <rect x={26} y={128} width={50} height={40} rx={6} fill={PANEL} stroke={W} strokeOpacity={0.4} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${34 + i * 11} 124 v-6 M${34 + i * 11} 172 v6`} stroke={W} strokeOpacity={0.4} />
    ))}
    <T x={51} y={152} size={9} anchor="middle" opacity={0.8}>GPU</T>
    <path className="pc-flow" d="M78 148 H100" stroke="currentColor" strokeDasharray="3 4" />
    <path d="M118 150 C160 100 262 100 304 150 C262 200 160 200 118 150 Z" fill="currentColor" fillOpacity={0.08} stroke={W} strokeOpacity={0.7} strokeWidth={1.5} />
    <path d="M304 150 L346 120 L336 150 L346 180 Z" fill="none" stroke={W} strokeOpacity={0.7} strokeWidth={1.5} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M${170 + i * 18} 122 q8 28 0 56`} fill="none" stroke={W} strokeOpacity={0.15} />
    ))}
    <path d="M154 120 q4 30 0 60" fill="none" stroke={W} strokeOpacity={0.45} />
    <circle cx={140} cy={144} r={5} fill="currentColor" />
    <BBox x={108} y={104} w={244} h={94} label="mackerel 0.97" />
    <rect className="pc-scan-x" x={110} y={104} width={2} height={94} fill="currentColor" fillOpacity={0.8} />
    <g transform="translate(408 170)">
      <path d="M-42 0 A42 42 0 0 1 42 0" fill="none" stroke={W} strokeOpacity={0.15} strokeWidth={8} strokeLinecap="round" />
      <path d={`M-42 0 A42 42 0 0 1 ${(42 * Math.cos(Math.PI * 0.03)).toFixed(1)} ${(-42 * Math.sin(Math.PI * 0.03)).toFixed(1)}`} fill="none" stroke="currentColor" strokeWidth={8} strokeLinecap="round" />
      <T x={0} y={-6} size={15} anchor="middle" fill="currentColor" opacity={1} weight={700}>97%</T>
      <T x={0} y={16} size={8.5} anchor="middle">freshness</T>
    </g>
    <T x={360} y={240} size={9}>Grade A · export OK</T>
  </g>
);

const LoomGuard = ({ uid }: { uid: string }) => (
  <g>
    <defs>
      <pattern id={`weave-${uid}`} width={16} height={16} patternUnits="userSpaceOnUse">
        <rect width={16} height={16} fill="#110e13" />
        <rect x={0.5} y={1} width={7} height={6} rx={1} fill={W} fillOpacity={0.22} />
        <rect x={8.5} y={9} width={7} height={6} rx={1} fill={W} fillOpacity={0.22} />
        <rect x={9} y={0.5} width={6} height={7} rx={1} fill={W} fillOpacity={0.1} />
        <rect x={1} y={8.5} width={6} height={7} rx={1} fill={W} fillOpacity={0.1} />
      </pattern>
    </defs>
    <rect x={30} y={44} width={420} height={210} rx={6} fill={`url(#weave-${uid})`} />
    {/* defect: torn hole with frayed threads */}
    <path d="M300 128 c10 -10 30 -6 34 6 c6 14 -4 30 -20 30 c-14 0 -24 -10 -20 -22 z" fill="#0b080c" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${304 + i * 6} ${130 + (i % 2) * 28} q4 ${i % 2 ? 8 : -8} ${8} 0`} fill="none" stroke={W} strokeOpacity={0.4} />
    ))}
    <BBox x={288} y={114} w={58} h={58} label="hole 0.91" />
    <BBox x={92} y={186} w={70} h={22} label="slub 0.78" />
    <rect className="pc-scan" x={30} y={44} width={420} height={2} fill="currentColor" />
    <rect className="pc-scan" x={30} y={44} width={420} height={24} fill="currentColor" fillOpacity={0.06} />
    <rect x={30} y={262} width={420} height={2} fill={W} fillOpacity={0.1} />
  </g>
);

const CareerForge = () => {
  const axes = ["Python", "ML / DL", "Cloud", "Web", "Data", "DSA"];
  const skill = [0.92, 0.85, 0.62, 0.74, 0.8, 0.58];
  const target = [0.8, 0.9, 0.85, 0.6, 0.7, 0.75];
  const cx = 300, cy = 152, R = 96;
  const poly = (v: number[]) => v.map((s, i) => polar(cx, cy, R * s, i * 60).join(",")).join(" ");
  return (
    <g>
      {[0.33, 0.66, 1].map((k) => (
        <polygon key={k} points={poly(Array(6).fill(k))} fill="none" stroke={W} strokeOpacity={0.12} />
      ))}
      {axes.map((a, i) => {
        const [x, y] = polar(cx, cy, R, i * 60);
        const [lx, ly] = polar(cx, cy, R + 18, i * 60);
        return (
          <g key={a}>
            <path d={`M${cx} ${cy} L${x} ${y}`} stroke={W} strokeOpacity={0.12} />
            <T x={lx} y={ly + 3} size={9} anchor={lx < cx - 5 ? "end" : lx > cx + 5 ? "start" : "middle"}>{a}</T>
          </g>
        );
      })}
      <polygon points={poly(target)} fill="none" stroke={W} strokeOpacity={0.5} strokeDasharray="4 4" />
      <polygon className="pc-pulse" points={poly(skill)} fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth={2} />
      {skill.map((s, i) => {
        const [x, y] = polar(cx, cy, R * s, i * 60);
        return <circle key={i} cx={x} cy={y} r={3.5} fill="currentColor" />;
      })}
      <g transform="translate(30 80)">
        <rect width={120} height={46} rx={8} fill={PANEL} stroke={W} strokeOpacity={0.2} />
        <T x={12} y={19} size={9}>GitHub scan</T>
        <T x={12} y={35} size={10} fill="currentColor" opacity={1}>skills found</T>
        <rect y={64} width={120} height={46} rx={8} fill={PANEL} stroke={W} strokeOpacity={0.2} />
        <T x={12} y={83} size={9}>JD match</T>
        <T x={12} y={99} size={10} fill="currentColor" opacity={1}>gaps mapped</T>
      </g>
      <T x={30} y={238} size={8.5}>— you   - - JD target</T>
    </g>
  );
};

const SCENES: Record<number, (p: { uid: string }) => JSX.Element> = {
  1: SkillSync,
  2: StickyNet,
  3: MARag,
  4: LearnWeave,
  5: PhishGuard,
  6: LatexAgent,
  7: VerifyX,
  8: Neutralis,
  9: JobScraper,
  10: ChandasAI,
  11: ChandasGame,
  12: SafeSight,
  13: SmartVision,
  14: LoomGuard,
  15: CareerForge,
};

interface Props {
  id: number;
  domain?: string;
  className?: string;
}

const ProjectCover = ({ id, domain, className = "" }: Props) => {
  const uid = useId().replace(/:/g, "");
  const Scene = SCENES[id];
  // Spread the glow around so neighbouring cards don't look identical
  const gx = [30, 70, 50, 20, 80][id % 5];
  const gy = [20, 80, 40, 70, 30][id % 5];
  return (
    <svg
      className={`project-cover ${className}`}
      viewBox="0 0 480 300"
      role="img"
      aria-label={`Illustration for project ${id}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`glow-${uid}`} cx={`${gx}%`} cy={`${gy}%`} r="70%">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.22} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </radialGradient>
        <pattern id={`dots-${uid}`} width={16} height={16} patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={0.9} fill={W} fillOpacity={0.09} />
        </pattern>
      </defs>
      <rect width={480} height={300} fill="#0d0a0f" />
      <rect width={480} height={300} fill={`url(#dots-${uid})`} />
      <rect width={480} height={300} fill={`url(#glow-${uid})`} />
      {Scene && <Scene uid={uid} />}
      <T x={18} y={24} size={9} opacity={0.45}>
        {`P/${String(id).padStart(2, "0")}${domain ? `  ·  ${domain.toUpperCase()}` : ""}`}
      </T>
    </svg>
  );
};

export default ProjectCover;
