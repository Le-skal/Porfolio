import React from "react";

/**
 * JsBackground
 * - Renders two fixed canvases to mimic the provided DOM:
 *   <div class="js-background background">
 *     <div class="js-background__shards background__shards" style="display:none;opacity:0;position:fixed;overflow:hidden"><canvas /></div>
 *     <canvas id="grain_canvas" />
 *   </div>
 * - Implements a lightweight animated grain effect using a small offscreen
 *   noise tile that is drawn as a pattern each frame for performance.
 * - Non-interactive (pointer-events: none) and sits behind other UI.
 */
export default function JsBackground({ intensity = 0.07, fps = 30, zIndex = 0, tint = false, tintGradient }) {
    const wrapperRef = React.useRef(null);
    const shardsCanvasRef = React.useRef(null);
    const grainCanvasRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const frameIntervalRef = React.useRef(1000 / fps);
    const lastTimeRef = React.useRef(0);

    // Fit canvases to viewport (account for DPR)
    const resize = React.useCallback(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.ceil(window.innerWidth);
        const height = Math.ceil(window.innerHeight);

        [shardsCanvasRef.current, grainCanvasRef.current].forEach((canvas) => {
            if (!canvas) return;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        });
    }, []);

    // Create small noise tile
    const makeNoiseTile = React.useCallback(() => {
        const size = 64; // small tile for performance
        const cnv = document.createElement("canvas");
        cnv.width = size;
        cnv.height = size;
        const ctx = cnv.getContext("2d");
        const imgData = ctx.createImageData(size, size);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = v; // r
            imgData.data[i + 1] = v; // g
            imgData.data[i + 2] = v; // b
            imgData.data[i + 3] = 255; // a
        }
        ctx.putImageData(imgData, 0, 0);
        return cnv;
    }, []);

    // Animation loop for grain
    React.useEffect(() => {
        resize();
        const handleResize = () => resize();
        window.addEventListener("resize", handleResize);

        const ctx = grainCanvasRef.current?.getContext("2d");
        if (!ctx) return () => window.removeEventListener("resize", handleResize);

        // ✅ Generate noise tile once
        const noiseTile = makeNoiseTile();
        const pattern = ctx.createPattern(noiseTile, "repeat");

        let offsetX = 0;
        let offsetY = 0;

        const loop = (time) => {
            // clear previous frame
            ctx.clearRect(0, 0, grainCanvasRef.current.width, grainCanvasRef.current.height);

            if (pattern) {
                ctx.save();
                ctx.globalAlpha = intensity;
                ctx.globalCompositeOperation = "source-over";

                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, grainCanvasRef.current.width + 64, grainCanvasRef.current.height + 64);

                ctx.restore();
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [intensity, makeNoiseTile, resize]);


    return (
        <div
            ref={wrapperRef}
            className="js-background background"
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex,
            }}
            aria-hidden
        >
            <div
                className="js-background__shards background__shards"
                style={{ display: "none", opacity: 0, position: "fixed", overflow: "hidden", inset: 0 }}
            >
                <canvas ref={shardsCanvasRef} />
            </div>
            <canvas
                id="grain_canvas"
                ref={grainCanvasRef}
                style={{ position: "fixed", left: 0, top: 0 }}
            />
            {tint && (
                <div
                    className="js-background__tint"
                    style={{
                        position: "fixed",
                        inset: 0,
                        // Default: darker edges, lighter center to keep focus image vivid
                        background:
                            tintGradient ||
                            "radial-gradient(circle at 50% 55%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.55) 100%)",
                    }}
                />
            )}
        </div>
    );
}
