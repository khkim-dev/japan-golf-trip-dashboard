import { useMemo, useState } from 'react'

function getNineLabel(course, holeNumber) {
  return holeNumber <= 9 ? course.courseNames[0] : course.courseNames[1]
}

function formatNumber(value) {
  return typeof value === 'number' ? value.toLocaleString() : 'TBD'
}

function formatTotal(course) {
  const totalPar = course.holes.reduce((sum, hole) => sum + hole.par, 0)
  const totalDistanceM = course.holes.reduce((sum, hole) => sum + hole.distanceM, 0)
  const totalDistanceYd = course.holes.reduce((sum, hole) => sum + hole.distanceYd, 0)

  return `Par ${totalPar} · ${totalDistanceYd.toLocaleString()}yd · ${totalDistanceM.toLocaleString()}m`
}

function ScreenGolfHoleMap({ hole }) {
  const map = hole.map

  if (!map) {
    return (
      <div className="screen-map-placeholder">
        <span>MAP SAMPLE</span>
        <strong>Hole {hole.hole}</strong>
        <p>홀맵 제작 대기</p>
      </div>
    )
  }

  return (
    <svg className="screen-hole-map" viewBox="0 0 500 780" role="img" aria-label={`Hole ${hole.hole} course map sample`}>
      <defs>
        <linearGradient id="map-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#071a12" />
          <stop offset="55%" stopColor="#0f3524" />
          <stop offset="100%" stopColor="#06140f" />
        </linearGradient>
        <linearGradient id="fairway-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#b9e27b" />
          <stop offset="50%" stopColor="#79bb4a" />
          <stop offset="100%" stopColor="#4e9637" />
        </linearGradient>
        <pattern id="fairway-stripe" width="28" height="28" patternTransform="rotate(-24)" patternUnits="userSpaceOnUse">
          <rect width="14" height="28" fill="rgba(255,255,255,0.15)" />
        </pattern>
        <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="500" height="780" rx="24" fill="url(#map-bg)" />
      <path d={map.fairway} fill="url(#fairway-fill)" opacity="0.95" filter="url(#map-glow)" />
      <path d={map.fairway} fill="url(#fairway-stripe)" opacity="0.46" />
      <path d={map.center} fill="#7fc851" opacity="0.72" />
      {map.water?.map((water, index) => (
        <path
          key={`water-${index}`}
          d={water.path}
          fill="#4fa9d8"
          opacity="0.9"
          stroke="#bfeeff"
          strokeWidth="4"
        />
      ))}
      {map.bunkers?.map((bunker, index) => (
        <ellipse
          key={`bunker-${index}`}
          cx={bunker.cx}
          cy={bunker.cy}
          fill="#f2eee1"
          rx={bunker.rx}
          ry={bunker.ry}
          stroke="#cfc3a7"
          strokeWidth="3"
          transform={`rotate(${bunker.rotate} ${bunker.cx} ${bunker.cy})`}
        />
      ))}
      {map.trees?.map((tree, index) => (
        <g key={`tree-${index}`} opacity="0.85">
          <circle cx={tree.x} cy={tree.y} r="17" fill="#173e2a" />
          <circle cx={tree.x - 8} cy={tree.y + 5} r="10" fill="#245a38" />
          <circle cx={tree.x + 8} cy={tree.y + 6} r="10" fill="#102b1f" />
        </g>
      ))}
      <ellipse cx={map.green.cx} cy={map.green.cy} rx={map.green.rx} ry={map.green.ry} fill="#5caf45" stroke="#ddff9b" strokeWidth="5" />
      <circle cx={map.tee.x} cy={map.tee.y} r="15" fill="#ffcf4f" stroke="#ffffff" strokeWidth="5" />
      <path d={map.targetLine} fill="none" stroke="#ffffff" strokeDasharray="10 12" strokeLinecap="round" strokeWidth="5" opacity="0.78" />
      {map.labels?.map((label, index) => (
        <text key={`label-${index}`} x={label.x} y={label.y} fill="#ffefef" fontSize="22" fontWeight="900">
          {label.text}
        </text>
      ))}
      <text x="32" y="54" fill="#c6ff7e" fontSize="20" fontWeight="900">
        SCREEN YARDAGE SAMPLE
      </text>
    </svg>
  )
}

export function YardageBook({ courses }) {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id)
  const [selectedHoleNumber, setSelectedHoleNumber] = useState(1)
  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [courses, selectedCourseId],
  )
  const selectedHole = selectedCourse.holes.find((hole) => hole.hole === selectedHoleNumber) ?? selectedCourse.holes[0]

  function handleCourseChange(courseId) {
    setSelectedCourseId(courseId)
    setSelectedHoleNumber(1)
  }

  return (
    <div className="yardage-book">
      <section className="yardage-hero" aria-labelledby="yardage-title">
        <span>Yardage Book</span>
        <h3 id="yardage-title">Screen Golf Course Preview</h3>
        <p>골프존으로 시작한 모임의 분위기를 살린 스크린골프풍 모바일 야디지북 샘플입니다.</p>
      </section>

      <div className="course-switcher" role="tablist" aria-label="Golf course selector">
        {courses.map((course) => (
          <button
            key={course.id}
            type="button"
            className={course.id === selectedCourse.id ? 'active' : ''}
            onClick={() => handleCourseChange(course.id)}
          >
            <span>{course.date}</span>
            {course.shortName}
          </button>
        ))}
      </div>

      <section className="course-summary" aria-label="Selected course summary">
        <div>
          <span>Course</span>
          <strong>{selectedCourse.name}</strong>
        </div>
        <div>
          <span>Tee</span>
          <strong>{selectedCourse.tee}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>{formatTotal(selectedCourse)}</strong>
        </div>
        <div>
          <span>Course 9</span>
          <strong>{selectedCourse.courseNames.join(' / ')}</strong>
        </div>
      </section>

      <div className="hole-picker" aria-label="Hole selector">
        {selectedCourse.holes.map((hole) => (
          <button
            key={`${selectedCourse.id}-picker-${hole.hole}`}
            type="button"
            className={hole.hole === selectedHole.hole ? 'active' : ''}
            onClick={() => setSelectedHoleNumber(hole.hole)}
          >
            {hole.hole}
          </button>
        ))}
      </div>

      <section className="featured-yardage-card" aria-label="Selected hole preview">
        <div className="featured-hole-header">
          <span>{getNineLabel(selectedCourse, selectedHole.hole)} Course</span>
          <h3>Hole {selectedHole.hole}</h3>
          <p>
            Par {formatNumber(selectedHole.par)} · {formatNumber(selectedHole.distanceYd)}yd · {formatNumber(selectedHole.distanceM)}m · HDCP{' '}
            {formatNumber(selectedHole.hdcp)}
          </p>
        </div>
        <ScreenGolfHoleMap hole={selectedHole} />
        <div className="featured-hole-memo">
          <span>Coach Memo</span>
          <p>{selectedHole.memo}</p>
        </div>
      </section>
    </div>
  )
}
