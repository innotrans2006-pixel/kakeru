import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  expectedAnswer: string;
  onClear?: () => void;
}

export function WritingCanvas({ expectedAnswer, onClear }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    return ctx;
  };

  const getPos = (e: PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: PointerEvent) => {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
    setIsDrawing(true);
    setHasStrokes(true);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: PointerEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx || !lastPos.current) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
  };

  const endDraw = (e: PointerEvent) => {
    e.preventDefault();
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    setHasStrokes(false);
    onClear?.();
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, w - 4, h - 4);
    ctx.strokeStyle = '#1a1a2e';
    ctx.setLineDash([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={endDraw}
          onPointerCancel={endDraw}
          style={{
            border: '2px solid #ddd',
            borderRadius: 12,
            background: 'white',
            touchAction: 'none',
            cursor: 'crosshair',
            display: 'block',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 160,
          color: 'rgba(0,0,0,0.06)',
          fontFamily: "'BIZ UDPMincho', 'Hiragino Mincho ProN', serif",
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}>
          {expectedAnswer}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={clear}
          style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: '2px solid #ddd',
            background: 'white',
            fontSize: 15,
            cursor: 'pointer',
            color: '#666',
          }}
        >
          🗑️ けす
        </button>
        {!hasStrokes && (
          <div style={{
            padding: '8px 16px',
            fontSize: 13,
            color: '#aaa',
            display: 'flex',
            alignItems: 'center',
          }}>
            ↑ ゆびで書いてね
          </div>
        )}
      </div>
    </div>
  );
}
