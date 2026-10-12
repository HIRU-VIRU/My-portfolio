import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/*
 * Stylized 3D Hiruthik at a desk, typing on a laptop.
 * Everything is built from primitives (no model download). The React layer
 * calls react("glance" | "think" | "done") as the agent moves through a task.
 */

export type Reaction = "glance" | "think" | "done";

export interface AgentAvatarHandle {
  react: (kind: Reaction) => void;
  setAccent: (hex: string) => void;
  dispose: () => void;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export function createAgentAvatar(
  canvas: HTMLCanvasElement,
  opts: { accent: string; reducedMotion: boolean }
): AgentAvatarHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const camTarget = V(0, -0.55, 0.4);

  /* ---------- Materials ---------- */
  const accent = new THREE.Color(opts.accent);
  const phys = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);
  const M = {
    skin: phys({ color: 0xb07550, roughness: 0.52, sheen: 0.5, sheenColor: new THREE.Color(0xffa080), sheenRoughness: 0.5, clearcoat: 0.06 }),
    skinShade: phys({ color: 0x9c6342, roughness: 0.6, sheen: 0.3, sheenColor: new THREE.Color(0xff9070) }),
    hair: phys({ color: 0x18110e, roughness: 0.5, sheen: 1, sheenColor: new THREE.Color(0x705040), sheenRoughness: 0.35 }),
    beard: new THREE.MeshStandardMaterial({ color: 0x3f2d24, roughness: 1 }),
    shirt: phys({ color: 0x2556a3, roughness: 0.78, sheen: 0.7, sheenColor: new THREE.Color(0x8cb8ff), sheenRoughness: 0.6 }),
    shirtDark: phys({ color: 0x1b4687, roughness: 0.75, sheen: 0.5, sheenColor: new THREE.Color(0x7aa6ff) }),
    strap: new THREE.MeshStandardMaterial({ color: 0x2c3038, roughness: 0.7 }),
    frame: phys({ color: 0x0c0c0e, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1 }),
    lens: phys({ color: 0xffffff, roughness: 0, transparent: true, opacity: 0.1, envMapIntensity: 2, depthWrite: false }),
    sclera: phys({ color: 0xf6f2ec, roughness: 0.12, clearcoat: 1 }),
    iris: phys({ color: 0x3a2214, roughness: 0.2, clearcoat: 1 }),
    pupil: new THREE.MeshBasicMaterial({ color: 0x050403 }),
    catch: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    lip: new THREE.MeshStandardMaterial({ color: 0x6a382c, roughness: 0.55 }),
    desk: phys({ color: 0x0d0a10, roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.4, envMapIntensity: 0.35 }),
    laptop: phys({ color: 0x3a3b42, metalness: 0.85, roughness: 0.32 }),
    keys: new THREE.MeshStandardMaterial({ color: 0x151518, roughness: 0.6 }),
    glow: new THREE.MeshBasicMaterial({ color: accent, toneMapped: false }),
    mug: phys({ color: 0xece8e2, roughness: 0.25, clearcoat: 0.6 }),
    coffee: new THREE.MeshStandardMaterial({ color: 0x2b170d, roughness: 0.2 }),
  };

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, p = V(0, 0, 0), s = V(1, 1, 1), r?: THREE.Euler) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(p);
    m.scale.copy(s);
    if (r) m.rotation.copy(r);
    parent.add(m);
    return m;
  };
  const tube = (pts: THREE.Vector3[], radius: number, seg = 24) =>
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, radius, 10, false);
  const roundedRect = (w: number, h: number, r: number) => {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  /** Capsule stretched between two points */
  const limb = (parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
    const dir = b.clone().sub(a);
    const len = dir.length();
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 16), mat);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
    parent.add(m);
    return m;
  };

  const root = new THREE.Group();
  scene.add(root);

  /* ---------- Body ---------- */
  const body = new THREE.Group();
  root.add(body);
  const torsoProfile = [
    [0.0, 0.42], [0.34, 0.4], [0.66, 0.3], [1.04, 0.1], [1.28, -0.2], [1.34, -0.62], [1.28, -1.45], [0.0, -1.5],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  add(body, new THREE.LatheGeometry(torsoProfile, 48), M.shirt, V(0, -1.0, 0), V(1, 1, 0.72));
  // collar band + points + placket
  add(body, new THREE.TorusGeometry(0.37, 0.06, 10, 40), M.shirt, V(0, -0.63, 0.02), V(1, 0.8, 1), new THREE.Euler(Math.PI / 2 - 0.15, 0, 0));
  const collarShape = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(0.36, -0.06), new THREE.Vector2(0.08, -0.34)]);
  const collarGeo = new THREE.ExtrudeGeometry(collarShape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 });
  add(body, collarGeo, M.shirtDark, V(0.05, -0.66, 0.36), V(1, 1, 1), new THREE.Euler(-0.55, 0.15, -0.1));
  add(body, collarGeo, M.shirtDark, V(-0.05, -0.66, 0.36), V(-1, 1, 1), new THREE.Euler(-0.55, -0.15, 0.1));
  add(body, new THREE.BoxGeometry(0.06, 1.0, 0.02), M.shirtDark, V(0, -1.35, 0.93), V(1, 1, 1), new THREE.Euler(-0.08, 0, 0));
  [-1.0, -1.32, -1.64].forEach((y) => add(body, new THREE.SphereGeometry(0.03, 10, 8), M.mug, V(0, y, 0.955)));
  // backpack straps over the shoulders
  [-1, 1].forEach((s) =>
    add(body, tube([V(s * 0.72, -2.0, 0.78), V(s * 0.8, -1.25, 0.86), V(s * 0.74, -0.74, 0.5), V(s * 0.66, -0.68, -0.1), V(s * 0.62, -1.2, -0.62)], 0.085, 40), M.strap)
  );
  // neck
  add(body, new THREE.CylinderGeometry(0.3, 0.36, 0.6, 24), M.skin, V(0, -0.5, 0));

  // Arms: shoulder → elbow → hand on the keyboard (hands sit behind the lid)
  const arms: THREE.Group[] = [];
  [-1, 1].forEach((s) => {
    const arm = new THREE.Group();
    arm.position.set(s * 1.15, -1.1, 0);
    body.add(arm);
    const elbow = V(s * 0.28, -0.85, 0.55);
    const hand = V(-s * 0.55, -0.88, 1.35);
    limb(arm, V(0, 0, 0), elbow, 0.27, M.shirt);
    limb(arm, elbow, hand, 0.17, M.skin);
    add(arm, new THREE.SphereGeometry(0.2, 20, 16), M.skin, hand, V(1.1, 0.7, 1.2));
    arms.push(arm);
  });

  /* ---------- Head ---------- */
  const head = new THREE.Group();
  head.position.set(0, 0.5, 0.05);
  root.add(head);
  add(head, new THREE.SphereGeometry(1, 64, 48), M.skin, V(0, 0, 0), V(0.9, 1.04, 0.94));
  [-1, 1].forEach((s) => add(head, new THREE.SphereGeometry(0.2, 20, 16), M.skinShade, V(s * 0.88, -0.02, -0.05), V(0.5, 1, 0.62)));

  // Hair: cap tilted so the hairline sits high, side volume, swept-up fringe
  add(head, new THREE.SphereGeometry(1.035, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.5), M.hair, V(0, 0.06, -0.05), V(0.93, 1.07, 0.99), new THREE.Euler(-0.48, 0, 0));
  [-1, 1].forEach((s) => add(head, new THREE.SphereGeometry(0.45, 24, 16), M.hair, V(s * 0.74, 0.3, -0.12), V(0.42, 0.85, 0.85)));
  ([
    [-0.42, 0.86, 0.36, 0.45],
    [-0.12, 0.98, 0.42, 0.15],
    [0.2, 0.99, 0.38, -0.15],
    [0.46, 0.86, 0.3, -0.45],
    [0.0, 1.06, 0.02, 0],
  ] as const).forEach(([x, y, z, rz]) =>
    add(head, new THREE.SphereGeometry(0.46, 28, 20), M.hair, V(x, y, z), V(1.0, 0.36, 0.78), new THREE.Euler(-0.55, 0, rz))
  );

  // Brows
  [-1, 1].forEach((s) =>
    add(head, tube([V(s * 0.17, 0.44, 0.9), V(s * 0.32, 0.47, 0.88), V(s * 0.48, 0.42, 0.82)], 0.045, 12), M.hair)
  );

  // Eyes: sclera, iris, pupil, catch-light and an eyelid that blinks
  const lids: THREE.Mesh[] = [];
  const irises: THREE.Group[] = [];
  [-1, 1].forEach((s) => {
    const eye = new THREE.Group();
    eye.position.set(s * 0.31, 0.15, 0.8);
    head.add(eye);
    add(eye, new THREE.SphereGeometry(0.15, 32, 24), M.sclera, V(0, 0, 0), V(1, 1, 0.55));
    const iris = new THREE.Group();
    eye.add(iris);
    add(iris, new THREE.SphereGeometry(0.088, 24, 16), M.iris, V(0, 0, 0.055), V(1, 1, 0.4));
    add(iris, new THREE.SphereGeometry(0.046, 16, 12), M.pupil, V(0, 0, 0.078), V(1, 1, 0.4));
    add(iris, new THREE.SphereGeometry(0.018, 8, 6), M.catch, V(0.03, 0.035, 0.09));
    irises.push(iris);
    const lid = add(eye, new THREE.SphereGeometry(0.158, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.skin, V(0, 0, 0), V(1, 1, 0.6));
    lids.push(lid);
  });
  const LID_OPEN = -0.95, LID_SHUT = 1.25;
  lids.forEach((l) => (l.rotation.x = LID_OPEN));

  // Glasses: rounded-rectangle frames with faint lenses
  const ring = roundedRect(0.5, 0.36, 0.11);
  ring.holes.push(roundedRect(0.42, 0.28, 0.08) as unknown as THREE.Path);
  const ringGeo = new THREE.ExtrudeGeometry(ring, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2, curveSegments: 16 });
  const lensGeo = new THREE.ShapeGeometry(roundedRect(0.43, 0.29, 0.08), 16);
  [-1, 1].forEach((s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.32, 0.14, 0.92);
    g.rotation.y = s * 0.1;
    head.add(g);
    add(g, ringGeo, M.frame);
    add(g, lensGeo, M.lens, V(0, 0, 0.02));
    // temple arm back to the ear
    add(head, tube([V(s * 0.56, 0.18, 0.88), V(s * 0.83, 0.17, 0.45), V(s * 0.86, 0.06, 0.0)], 0.02, 12), M.frame);
  });
  add(head, tube([V(-0.08, 0.17, 0.96), V(0, 0.2, 0.98), V(0.08, 0.17, 0.96)], 0.022, 8), M.frame);

  // Nose, moustache, smile, short beard
  add(head, new THREE.SphereGeometry(0.13, 24, 16), M.skinShade, V(0, -0.08, 0.94), V(0.88, 0.95, 1.05));
  add(head, tube([V(-0.2, -0.29, 0.87), V(-0.08, -0.275, 0.93), V(0.08, -0.275, 0.93), V(0.2, -0.29, 0.87)], 0.036, 16), M.beard);
  const mouth = add(head, tube([V(-0.18, -0.39, 0.87), V(-0.09, -0.46, 0.91), V(0.09, -0.46, 0.91), V(0.18, -0.39, 0.87)], 0.024, 16), M.lip);
  add(head, new THREE.SphereGeometry(1.012, 64, 32, Math.PI / 2 - 0.9, 1.8, Math.PI * 0.665, Math.PI * 0.25), M.beard, V(0, 0, 0), V(0.905, 1.045, 0.945));

  /* ---------- Desk + laptop + mug ---------- */
  const desk = new THREE.Group();
  root.add(desk);
  add(desk, new THREE.BoxGeometry(6.2, 0.14, 2.6), M.desk, V(0, -2.02, 1.1));
  add(desk, new THREE.BoxGeometry(6.2, 0.025, 0.025), M.glow, V(0, -1.955, 2.41));

  add(desk, new THREE.BoxGeometry(2.2, 0.07, 1.45), M.laptop, V(0, -1.915, 1.2));
  add(desk, new THREE.BoxGeometry(1.95, 0.01, 0.8), M.keys, V(0, -1.875, 1.05));
  const lid = new THREE.Group();
  lid.position.set(0, -1.88, 1.92);
  lid.rotation.x = 0.2;
  desk.add(lid);
  add(lid, new THREE.BoxGeometry(2.2, 1.38, 0.05), M.laptop, V(0, 0.69, 0));
  // Glowing logo on the back of the lid
  add(lid, new THREE.RingGeometry(0.12, 0.17, 40), M.glow, V(0, 0.72, 0.03));
  add(lid, new THREE.CircleGeometry(0.05, 24), M.glow, V(0, 0.72, 0.03));
  // Stickers
  const sticker = (geo: THREE.BufferGeometry, color: number, x: number, y: number, rot = 0) =>
    add(lid, geo, new THREE.MeshStandardMaterial({ color, roughness: 0.5 }), V(x, y, 0.028), V(1, 1, 1), new THREE.Euler(0, 0, rot));
  sticker(new THREE.CircleGeometry(0.15, 32), 0x3776ab, -0.72, 1.05);
  sticker(new THREE.CircleGeometry(0.075, 32), 0xffd43b, -0.66, 0.98);
  sticker(new THREE.CircleGeometry(0.14, 6), 0x7f40ff, 0.7, 0.42, 0.3);
  sticker(new THREE.ShapeGeometry(roundedRect(0.34, 0.18, 0.05)), 0xff5c7a, 0.62, 1.08, -0.15);
  sticker(new THREE.ShapeGeometry(roundedRect(0.26, 0.26, 0.06)), 0xf4f1ec, -0.58, 0.36, 0.2);

  // Mug with a wisp of steam
  const mug = new THREE.Group();
  mug.position.set(2.05, -1.95, 1.2);
  desk.add(mug);
  add(mug, new THREE.CylinderGeometry(0.2, 0.18, 0.4, 32, 1, true), M.mug, V(0, 0.2, 0));
  add(mug, new THREE.CircleGeometry(0.19, 32), M.coffee, V(0, 0.36, 0), V(1, 1, 1), new THREE.Euler(-Math.PI / 2, 0, 0));
  add(mug, new THREE.TorusGeometry(0.1, 0.03, 10, 24), M.mug, V(0.22, 0.2, 0), V(1, 1, 1), new THREE.Euler(0, 0, 0));

  /* ---------- Lights ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x140c18, 0.35));
  const key = new THREE.DirectionalLight(0xfff0e0, 2.2);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rimA = new THREE.DirectionalLight(accent, 1.5);
  rimA.position.set(-3.5, 2.5, -4);
  scene.add(rimA);
  const rimB = new THREE.DirectionalLight(0x8a5cff, 1.3);
  rimB.position.set(3.5, 2, -4);
  scene.add(rimB);
  // Screen light on the face from the laptop
  const screen = new THREE.PointLight(0xcfeeff, 2.4, 5, 1.6);
  screen.position.set(0, -1.15, 1.55);
  scene.add(screen);

  /* ---------- Behaviour ---------- */
  const pointer = { x: 0, y: 0, last: -10 };
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 0.7), -1, 1);
    pointer.y = THREE.MathUtils.clamp((e.clientY - (r.top + r.height * 0.3)) / (r.height * 0.7), -1, 1);
    pointer.last = clock.elapsedTime;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let reaction: { kind: Reaction; t: number } | null = null;
  const look = { x: 0.2, y: 0 };
  let nextBlink = 1.5, blinkT = -1;

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull back on narrow screens so the whole desk stays in frame
    const narrow = w / h < 0.85;
    camera.fov = narrow ? 36 : 30;
    camera.position.set(0, 0.9, narrow ? 12.5 : 11.2);
    camera.lookAt(camTarget);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  let running = true, raf = 0;
  const io = new IntersectionObserver(([e]) => (running = e.isIntersecting));
  io.observe(canvas);

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!running || document.hidden) return;
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    const motion = !opts.reducedMotion;

    // Where to look: cursor if it moved recently, else the laptop / reaction
    let tx = 0.08 * Math.sin(t * 0.4), ty = 0.22;
    if (reaction) {
      const k = t - reaction.t;
      if (reaction.kind === "glance" && k < 1.3) { tx = 0.5; ty = -0.18; }
      else if (reaction.kind === "think" && k < 1.4) { tx = -0.25; ty = -0.3; }
      else if (reaction.kind === "done" && k < 1.6) { tx = 0.15; ty = -0.12; }
      else reaction = null;
    }
    if (t - pointer.last < 2.5) { tx = pointer.x * 0.6; ty = pointer.y * 0.35; }
    const ease = Math.min(1, dt * 4.5);
    look.x += (tx - look.x) * ease;
    look.y += (ty - look.y) * ease;

    head.rotation.y = look.x * 0.75;
    head.rotation.x = look.y * 0.65;
    head.rotation.z = -look.x * 0.06 + (reaction?.kind === "think" ? 0.1 : 0);
    body.rotation.y = look.x * 0.12;
    irises.forEach((g) => g.position.set(look.x * 0.04, -look.y * 0.04, 0));

    if (motion) {
      // breathing + typing
      const breathe = Math.sin(t * 1.4);
      body.position.y = breathe * 0.012;
      head.position.y = 0.5 + breathe * 0.015;
      const typing = !reaction || reaction.kind !== "done";
      arms.forEach((a, i) => {
        const tap = typing ? Math.max(0, Math.sin(t * 13 + i * 2.2)) * 0.035 : 0;
        a.rotation.x = -tap;
      });
      screen.intensity = 2.2 + (typing ? Math.sin(t * 9) * 0.25 + Math.sin(t * 23) * 0.15 : 0.6);

      // Celebrate: little bounce and a nod
      if (reaction?.kind === "done") {
        const k = t - reaction.t;
        root.position.y = Math.max(0, Math.sin(k * 7)) * 0.06 * Math.max(0, 1 - k / 1.2);
        head.rotation.x += Math.sin(k * 10) * 0.08 * Math.max(0, 1 - k / 1.2);
        arms.forEach((a) => (a.rotation.x = -0.25 * Math.max(0, 1 - k / 1.2)));
      } else root.position.y = 0;

      // Blink
      if (t > nextBlink) { blinkT = 0; nextBlink = t + 2.2 + Math.random() * 3.2; }
      if (blinkT >= 0) {
        blinkT += dt;
        const k = blinkT < 0.07 ? blinkT / 0.07 : 1 - (blinkT - 0.07) / 0.1;
        lids.forEach((l) => (l.rotation.x = LID_OPEN + (LID_SHUT - LID_OPEN) * Math.max(0, Math.min(1, k))));
        if (blinkT > 0.17) { blinkT = -1; lids.forEach((l) => (l.rotation.x = LID_OPEN)); }
      }
      mouth.scale.set(1, reaction?.kind === "done" ? 1.25 : 1, 1);
    }
    renderer.render(scene, camera);
  };
  tick();

  return {
    react(kind) {
      reaction = { kind, t: clock.elapsedTime };
    },
    setAccent(hex) {
      accent.set(hex);
      M.glow.color.set(hex);
      rimA.color.set(hex);
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).geometry.dispose();
      });
      Object.values(M).forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
