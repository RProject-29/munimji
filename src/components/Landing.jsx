import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
const munimImg = '/munim-mascot.png'

// ─── 3D Financial Element Components ─────────────────────────────

function Coin3D({ size = 60, color = '#FF9933', symbol = '₹', style = {} }) {
  return (
    <div style={{ width: size, height: size, ...style }} className="coin-3d">
      <div className="coin-face coin-front" style={{ background: `radial-gradient(circle at 35% 35%, ${color}ee, ${color}88)` }}>
        <span style={{ fontSize: size * 0.38, color: '#fff', fontWeight: 800, fontFamily: 'Baloo 2, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          {symbol}
        </span>
      </div>
      <div className="coin-edge" style={{ background: `linear-gradient(to bottom, ${color}cc, ${color}44)` }} />
    </div>
  )
}

function ChartLine({ width = 120, height = 60, color = '#138808', style = {} }) {
  const points = [
    [0, height * 0.7],
    [width * 0.15, height * 0.6],
    [width * 0.3, height * 0.75],
    [width * 0.45, height * 0.4],
    [width * 0.6, height * 0.5],
    [width * 0.75, height * 0.2],
    [width * 0.9, height * 0.3],
    [width, height * 0.1],
  ]
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const areaD = pathD + ` L${width},${height} L0,${height} Z`

  return (
    <svg width={width} height={height} style={style} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`chartGrad${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#chartGrad${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="4" fill={color} />
    </svg>
  )
}

function FloatingBadge({ text, bgColor, textColor, style = {} }) {
  return (
    <div
      style={{
        background: bgColor,
        color: textColor,
        padding: '6px 14px',
        borderRadius: 99,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        boxShadow: `0 4px 16px ${bgColor}55`,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {text}
    </div>
  )
}

function CandleStick({ up = true, style = {} }) {
  const color = up ? '#138808' : '#e53935'
  return (
    <svg width="24" height="52" viewBox="0 0 24 52" style={style}>
      <line x1="12" y1="0" x2="12" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="14" width="16" height="24" rx="3" fill={color} />
      <line x1="12" y1="38" x2="12" y2="52" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PercentBadge({ value, style = {} }) {
  const isPos = value >= 0
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: isPos ? '#e8f5e9' : '#ffebee',
      color: isPos ? '#138808' : '#e53935',
      padding: '5px 12px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      ...style,
    }}>
      <span>{isPos ? '▲' : '▼'}</span>
      <span>{Math.abs(value)}%</span>
    </div>
  )
}

// ─── Main Landing Component ───────────────────────────────────────

export default function Landing({ onEnter }) {
  const [leaving, setLeaving] = useState(false)
  const { t, greeting } = useLanguage()

  function handleEnter() {
    setLeaving(true)
    setTimeout(onEnter, 500)
  }

  return (
    <div className={`landing-root ${leaving ? 'landing-leaving' : ''}`}>

      {/* ── Background grid / subtle pattern ── */}
      <div className="landing-grid" />

      {/* ── Floating financial elements ── */}

      {/* Top left cluster */}
      <Coin3D size={64} color="#FF9933" symbol="₹"
        style={{ position: 'absolute', top: '8%', left: '6%', animation: 'floatA 6s ease-in-out infinite' }} />
      <ChartLine width={130} height={65} color="#138808"
        style={{ position: 'absolute', top: '14%', left: '13%', animation: 'floatB 7s ease-in-out infinite', opacity: 0.9 }} />
      <PercentBadge value={12.4}
        style={{ position: 'absolute', top: '6%', left: '22%', animation: 'floatC 5.5s ease-in-out infinite' }} />

      {/* Top right cluster */}
      <Coin3D size={52} color="#FFC580" symbol="$"
        style={{ position: 'absolute', top: '7%', right: '18%', animation: 'floatB 8s ease-in-out infinite' }} />
      <FloatingBadge text="SIP ₹2,000/mo" bgColor="#0B1F3A" textColor="#FFF8F0"
        style={{ position: 'absolute', top: '16%', right: '6%', animation: 'floatA 6.5s ease-in-out infinite' }} />
      <ChartLine width={110} height={55} color="#FF9933"
        style={{ position: 'absolute', top: '24%', right: '16%', animation: 'floatC 7.5s ease-in-out infinite', opacity: 0.8 }} />

      {/* Left mid */}
      <div style={{ position: 'absolute', top: '38%', left: '4%', display: 'flex', gap: 6, animation: 'floatB 9s ease-in-out infinite' }}>
        <CandleStick up={true} />
        <CandleStick up={false} />
        <CandleStick up={true} />
        <CandleStick up={true} />
        <CandleStick up={false} />
      </div>
      <FloatingBadge text="₹ 11,61,695" bgColor="#138808" textColor="#fff"
        style={{ position: 'absolute', top: '52%', left: '5%', animation: 'floatA 7s ease-in-out infinite' }} />
      <Coin3D size={44} color="#138808" symbol="₹"
        style={{ position: 'absolute', top: '62%', left: '8%', animation: 'floatC 6s ease-in-out infinite' }} />

      {/* Right mid */}
      <FloatingBadge text="FD 7.5% p.a." bgColor="#FF9933" textColor="#fff"
        style={{ position: 'absolute', top: '40%', right: '5%', animation: 'floatC 8s ease-in-out infinite' }} />
      <PercentBadge value={-2.1}
        style={{ position: 'absolute', top: '52%', right: '8%', animation: 'floatA 6s ease-in-out infinite' }} />
      <Coin3D size={56} color="#0B1F3A" symbol="₹"
        style={{ position: 'absolute', top: '62%', right: '6%', animation: 'floatB 7s ease-in-out infinite' }} />

      {/* Bottom clusters */}
      <ChartLine width={150} height={70} color="#0B1F3A"
        style={{ position: 'absolute', bottom: '18%', left: '5%', animation: 'floatA 8.5s ease-in-out infinite', opacity: 0.7 }} />
      <FloatingBadge text="Nifty 50 ▲ 0.8%" bgColor="#e8f5e9" textColor="#138808"
        style={{ position: 'absolute', bottom: '10%', left: '6%', animation: 'floatC 6s ease-in-out infinite' }} />
      <Coin3D size={48} color="#FFC580" symbol="₹"
        style={{ position: 'absolute', bottom: '22%', right: '12%', animation: 'floatB 5.5s ease-in-out infinite' }} />
      <FloatingBadge text="PPF 7.1% tax-free" bgColor="#FFF3E0" textColor="#E65100"
        style={{ position: 'absolute', bottom: '12%', right: '5%', animation: 'floatA 7.5s ease-in-out infinite' }} />

      {/* ── Centre content ── */}
      <div className="landing-content">
        <p className="landing-greeting">{greeting}</p>

        <div className="landing-logo-row">
          <div className="landing-rupee-icon">₹</div>
          <h1 className="landing-title">
            Munim<span className="landing-title-accent">Ji</span>
          </h1>
        </div>

        <div className="landing-divider-row">
          <span className="landing-divider-line" />
          <p className="landing-tagline">{t('landing_tagline')}</p>
          <span className="landing-divider-line" />
        </div>






<p className="landing-sub">{t('landing_sub')}</p>

        {/* Munim character */}
        <div className="landing-munim-wrap">
          <img
            src="/src/assets/munim-mascot.png"
            alt="MunimJi"
            className="landing-munim-img"
          />
        </div>
















        {/* Mini stats strip */}
        <div className="landing-stats">
          <div className="landing-stat">
            <span className="landing-stat-value">5+</span>
            <span className="landing-stat-label">Languages</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">6</span>
            <span className="landing-stat-label">Calculators</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">75+</span>
            <span className="landing-stat-label">Finance terms</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">Free</span>
            <span className="landing-stat-label">Always</span>
          </div>
        </div>

        <button onClick={handleEnter} className="landing-enter-btn">
          Enter
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .landing-root {
          position: fixed;
          inset: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAFAF8;
          font-family: 'Inter', sans-serif;
        }

        .landing-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(11,31,58,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,31,58,0.045) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* 3D Coin */
        .coin-3d {
          position: relative;
          transform-style: preserve-3d;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.18));
        }
        .coin-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,0.3);
        }
        .coin-edge {
          position: absolute;
          bottom: -6px;
          left: 8%;
          width: 84%;
          height: 8px;
          border-radius: 0 0 50% 50%;
          opacity: 0.7;
        }

        /* Centre content */
        .landing-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          max-width: 560px;
          animation: contentFadeIn 0.8s ease-out forwards;
        }

        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .landing-greeting {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FF9933;
          margin-bottom: 16px;
        }

        .landing-logo-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .landing-rupee-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #FF9933, #E67E00);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 4px 16px rgba(255,153,51,0.4), 0 1px 3px rgba(0,0,0,0.1);
          font-family: 'Baloo 2', sans-serif;
        }

        .landing-title {
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(44px, 8vw, 70px);
          font-weight: 600;
          color: #0B1F3A;
          line-height: 1;
          letter-spacing: -1px;
          margin: 0;
        }

        .landing-title-accent {
          color: #FF9933;
        }

        .landing-divider-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .landing-divider-line {
          height: 1px;
          width: 40px;
          background: linear-gradient(to right, transparent, #0B1F3A33);
        }

        .landing-tagline {
          font-size: 14px;
          font-weight: 600;
          color: #5C5650;
          letter-spacing: 0.04em;
          margin: 0;
          white-space: nowrap;
        }

        .landing-sub {
          font-size: 14px;
          color: #8C857B;
          line-height: 1.7;
          max-width: 360px;
          margin-bottom: 24px;
        }

        /* Mini stats */
        .landing-stats {
          display: flex;
          align-items: center;
          gap: 0;
          background: #fff;
          border: 1px solid #EFE6D8;
          border-radius: 14px;
          padding: 12px 20px;
          margin-bottom: 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .landing-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px;
        }
        .landing-stat-value {
          font-size: 18px;
          font-weight: 800;
          color: #0B1F3A;
          font-family: 'Baloo 2', sans-serif;
          line-height: 1.2;
        }
        .landing-stat-label {
          font-size: 10px;
          color: #8C857B;
          font-weight: 500;
          white-space: nowrap;
        }
        .landing-stat-divider {
          width: 1px;
          height: 28px;
          background: #EFE6D8;
          flex-shrink: 0;
        }

        /* Enter button */
        .landing-enter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF9933, #E67E00);
          color: #fff;
          font-family: 'Baloo 2', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(255,153,51,0.45), 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.15s, box-shadow 0.15s;
          animation: btnPulse 2.5s ease-in-out infinite;
        }
        .landing-enter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255,153,51,0.55);
        }
        .landing-enter-btn:active {
          transform: scale(0.97);
        }

        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(255,153,51,0.45); }
          50% { box-shadow: 0 8px 36px rgba(255,153,51,0.65); }
        }

        /* Page exit */
        .landing-leaving {
          animation: landingLeave 0.5s ease-in forwards;
        }
        @keyframes landingLeave {
          to { opacity: 0; transform: scale(1.03); }
        }

        /* Float animations — each with different path */
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(3deg); }
          66% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-4deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          75% { transform: translateY(-14px) rotate(-3deg); }
        }

        /* Mobile responsive */
        /* Munim character */
        .landing-munim-wrap {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 8px;
          border: 3px solid rgba(255,153,51,0.25);
          box-shadow: 0 8px 32px rgba(255,153,51,0.2), 0 2px 8px rgba(0,0,0,0.08);
          background: #1a1a2e;
          animation: floatA 6s ease-in-out infinite;
          flex-shrink: 0;
        }
        .landing-munim-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 10%;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .landing-munim-wrap {
            width: 130px;
            height: 130px;
          }
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .landing-stats {
            padding: 10px 8px;
          }
          .landing-stat {
            padding: 0 10px;
          }
          .landing-stat-value {
            font-size: 15px;
          }
          .landing-tagline {
            font-size: 12px;
            white-space: normal;
          }
          .landing-enter-btn {
            font-size: 15px;
            padding: 13px 28px;
          }
        }

        /* Hide floating elements on very small screens to avoid clutter */
        @media (max-width: 480px) {
          .landing-root > div:not(.landing-grid):not(.landing-content) {
            display: none;
          }
          .landing-content {
            padding: 0 20px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .landing-enter-btn,
          .landing-content,
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}