const toMeters = (yards) => Math.round(yards * 0.9144)

const buildHoles = (courseKey, holes) =>
  holes.map((hole) => ({
    ...hole,
    distanceM: toMeters(hole.distanceYd),
    map: courseMaps[courseKey][hole.hole],
  }))

function blob(cx, cy, rx, ry) {
  return `M${cx - rx} ${cy} C${cx - rx} ${cy - ry} ${cx - rx * 0.35} ${cy - ry} ${cx} ${cy - ry} C${cx + rx * 0.75} ${cy - ry} ${cx + rx} ${cy - ry * 0.25} ${cx + rx} ${cy} C${cx + rx} ${cy + ry * 0.8} ${cx + rx * 0.25} ${cy + ry} ${cx} ${cy + ry} C${cx - rx * 0.8} ${cy + ry} ${cx - rx} ${cy + ry * 0.3} ${cx - rx} ${cy} Z`
}

function buildRibbon(points, widths) {
  const left = []
  const right = []

  points.forEach((point, index) => {
    const previous = points[Math.max(index - 1, 0)]
    const next = points[Math.min(index + 1, points.length - 1)]
    const dx = next.x - previous.x || 1
    const dy = next.y - previous.y || 1
    const length = Math.hypot(dx, dy)
    const normalX = -dy / length
    const normalY = dx / length
    const width = widths[index] ?? widths[widths.length - 1] ?? 70

    left.push({ x: point.x + normalX * width, y: point.y + normalY * width })
    right.push({ x: point.x - normalX * width, y: point.y - normalY * width })
  })

  return [
    `M${left[0].x.toFixed(0)} ${left[0].y.toFixed(0)}`,
    ...left.slice(1).map((point) => `L${point.x.toFixed(0)} ${point.y.toFixed(0)}`),
    ...right.reverse().map((point) => `L${point.x.toFixed(0)} ${point.y.toFixed(0)}`),
    'Z',
  ].join(' ')
}

function buildTargetLine(points) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ')
}

function sideTrees(points, side = 'both') {
  const treePoints = []

  points.slice(1, -1).forEach((point, index) => {
    const previous = points[Math.max(index, 0)]
    const next = points[Math.min(index + 2, points.length - 1)]
    const dx = next.x - previous.x || 1
    const dy = next.y - previous.y || 1
    const length = Math.hypot(dx, dy)
    const normalX = -dy / length
    const normalY = dx / length

    if (side === 'left' || side === 'both') {
      treePoints.push({ x: Math.round(point.x + normalX * 96), y: Math.round(point.y + normalY * 96) })
    }

    if (side === 'right' || side === 'both') {
      treePoints.push({ x: Math.round(point.x - normalX * 96), y: Math.round(point.y - normalY * 96) })
    }
  })

  return treePoints.slice(0, 8)
}

function makeHoleMap({ line, widths, green, tee, bunkers = [], water = [], labels = [], treeSide = 'both' }) {
  return {
    fairway: buildRibbon(line, widths),
    center: buildRibbon(line, widths.map((width) => width * 0.46)),
    green,
    tee,
    bunkers,
    water: water.map((shape) => ({ path: shape.path ?? blob(shape.cx, shape.cy, shape.rx, shape.ry) })),
    trees: sideTrees(line, treeSide),
    labels,
    targetLine: buildTargetLine(line),
  }
}

const b = (cx, cy, rx, ry, rotate = 0) => ({ cx, cy, rx, ry, rotate })
const p = (x, y) => ({ x, y })

const mizunamiMaps = {
  1: makeHoleMap({
    line: [p(100, 710), p(142, 590), p(170, 480), p(235, 370), p(310, 270), p(308, 130)],
    widths: [42, 58, 66, 72, 70, 54],
    green: { cx: 308, cy: 112, rx: 54, ry: 34 },
    tee: { x: 100, y: 710 },
    bunkers: [b(238, 286, 18, 9, -28), b(316, 250, 24, 10, 22), b(238, 426, 14, 8, 16), b(174, 536, 17, 8, -16)],
    labels: [{ x: 76, y: 454, text: 'OB' }, { x: 404, y: 350, text: 'OB' }],
  }),
  2: makeHoleMap({
    line: [p(238, 710), p(228, 595), p(230, 478), p(242, 350), p(272, 220), p(290, 116)],
    widths: [38, 52, 60, 64, 62, 50],
    green: { cx: 292, cy: 102, rx: 44, ry: 32 },
    tee: { x: 238, y: 710 },
    bunkers: [b(174, 360, 24, 10, -28), b(334, 248, 18, 8, 34), b(332, 160, 16, 8, 18)],
    labels: [{ x: 130, y: 480, text: 'OB' }],
  }),
  3: makeHoleMap({
    line: [p(264, 700), p(245, 578), p(230, 460), p(245, 344), p(278, 225), p(286, 108)],
    widths: [42, 58, 66, 68, 62, 52],
    green: { cx: 286, cy: 96, rx: 48, ry: 31 },
    tee: { x: 264, y: 700 },
    bunkers: [b(206, 230, 18, 46, -12), b(324, 242, 16, 10, 22), b(210, 372, 16, 10, 22)],
    labels: [{ x: 146, y: 240, text: 'OB' }],
  }),
  4: makeHoleMap({
    line: [p(252, 694), p(246, 552), p(248, 392), p(252, 242), p(252, 110)],
    widths: [44, 70, 84, 88, 66],
    green: { cx: 252, cy: 98, rx: 62, ry: 42 },
    tee: { x: 252, y: 694 },
    bunkers: [b(306, 142, 18, 10, 25), b(334, 178, 18, 9, -18), b(330, 220, 14, 8, 12)],
    labels: [{ x: 104, y: 408, text: 'OB' }],
  }),
  5: makeHoleMap({
    line: [p(236, 714), p(230, 596), p(226, 466), p(245, 328), p(264, 210), p(278, 104)],
    widths: [38, 52, 58, 62, 56, 42],
    green: { cx: 278, cy: 92, rx: 42, ry: 28 },
    tee: { x: 236, y: 714 },
    bunkers: [b(198, 238, 18, 8, -18), b(315, 168, 16, 8, 20), b(230, 464, 18, 8, 8)],
    labels: [{ x: 126, y: 540, text: 'OB' }],
  }),
  6: makeHoleMap({
    line: [p(172, 710), p(192, 592), p(238, 484), p(292, 374), p(325, 238), p(296, 106)],
    widths: [40, 54, 62, 68, 64, 48],
    green: { cx: 294, cy: 96, rx: 48, ry: 32 },
    tee: { x: 172, y: 710 },
    bunkers: [b(336, 226, 17, 8, -22), b(358, 266, 15, 8, 18), b(318, 320, 15, 8, 26), b(232, 492, 20, 8, -15)],
    labels: [{ x: 86, y: 508, text: 'OB' }, { x: 374, y: 400, text: 'OB' }],
  }),
  7: makeHoleMap({
    line: [p(270, 700), p(230, 580), p(204, 458), p(238, 332), p(282, 222), p(304, 106)],
    widths: [42, 60, 68, 76, 66, 52],
    green: { cx: 306, cy: 94, rx: 50, ry: 31 },
    tee: { x: 270, y: 700 },
    bunkers: [b(232, 216, 16, 8, -18), b(320, 248, 18, 8, 22), b(344, 294, 18, 8, -16), b(250, 374, 16, 8, 15)],
    labels: [{ x: 130, y: 390, text: 'OB' }],
  }),
  8: makeHoleMap({
    line: [p(226, 696), p(240, 552), p(260, 390), p(280, 238), p(304, 108)],
    widths: [42, 74, 90, 88, 64],
    green: { cx: 304, cy: 92, rx: 58, ry: 36 },
    tee: { x: 226, y: 696 },
    bunkers: [b(236, 162, 18, 9, -22), b(366, 166, 20, 10, 22), b(350, 214, 18, 8, -12)],
    labels: [{ x: 126, y: 300, text: 'OB' }],
  }),
  9: makeHoleMap({
    line: [p(210, 708), p(210, 596), p(226, 480), p(266, 366), p(286, 230), p(300, 104)],
    widths: [36, 52, 60, 64, 60, 48],
    green: { cx: 300, cy: 92, rx: 46, ry: 30 },
    tee: { x: 210, y: 708 },
    bunkers: [b(268, 296, 18, 8, -18), b(334, 166, 18, 9, 20)],
    labels: [{ x: 118, y: 478, text: 'OB' }],
  }),
  10: makeHoleMap({
    line: [p(198, 708), p(220, 594), p(255, 470), p(292, 340), p(318, 214), p(300, 96)],
    widths: [40, 56, 64, 72, 62, 48],
    green: { cx: 300, cy: 84, rx: 44, ry: 30 },
    tee: { x: 198, y: 708 },
    bunkers: [b(226, 270, 22, 10, -22), b(344, 210, 16, 8, 28), b(250, 432, 16, 8, 16)],
    water: [{ cx: 180, cy: 358, rx: 38, ry: 100 }, { cx: 354, cy: 132, rx: 34, ry: 80 }],
    labels: [{ x: 110, y: 362, text: 'OB' }],
  }),
  11: makeHoleMap({
    line: [p(178, 704), p(210, 584), p(266, 470), p(322, 350), p(334, 210), p(284, 94)],
    widths: [38, 54, 62, 70, 62, 46],
    green: { cx: 282, cy: 82, rx: 46, ry: 30 },
    tee: { x: 178, y: 704 },
    bunkers: [b(210, 632, 20, 9, -14), b(226, 510, 16, 8, 26), b(258, 184, 18, 8, -24)],
    water: [{ cx: 360, cy: 140, rx: 48, ry: 92 }],
    labels: [{ x: 94, y: 522, text: 'OB' }],
  }),
  12: makeHoleMap({
    line: [p(230, 700), p(236, 570), p(256, 420), p(282, 260), p(310, 108)],
    widths: [42, 68, 84, 78, 58],
    green: { cx: 310, cy: 92, rx: 52, ry: 32 },
    tee: { x: 230, y: 700 },
    bunkers: [b(336, 204, 15, 8, 22), b(356, 230, 16, 8, -16), b(346, 260, 14, 8, 20)],
    water: [{ cx: 164, cy: 566, rx: 54, ry: 120 }],
    labels: [{ x: 100, y: 380, text: 'OB' }],
  }),
  13: makeHoleMap({
    line: [p(252, 704), p(226, 594), p(212, 478), p(250, 360), p(310, 236), p(314, 96)],
    widths: [40, 56, 66, 72, 64, 50],
    green: { cx: 314, cy: 84, rx: 48, ry: 30 },
    tee: { x: 252, y: 704 },
    bunkers: [b(264, 248, 16, 8, -18), b(340, 220, 17, 8, 24), b(222, 402, 18, 8, 12)],
    labels: [{ x: 112, y: 420, text: 'OB' }],
  }),
  14: makeHoleMap({
    line: [p(172, 704), p(210, 584), p(280, 464), p(328, 330), p(318, 200), p(282, 94)],
    widths: [42, 58, 64, 70, 62, 48],
    green: { cx: 282, cy: 84, rx: 48, ry: 30 },
    tee: { x: 172, y: 704 },
    bunkers: [b(162, 526, 44, 18, -24), b(232, 474, 18, 8, 18), b(312, 246, 17, 8, -18), b(334, 206, 15, 8, 24)],
    labels: [{ x: 84, y: 524, text: 'OB' }],
  }),
  15: makeHoleMap({
    line: [p(250, 700), p(252, 560), p(264, 408), p(280, 248), p(298, 106)],
    widths: [42, 76, 90, 88, 62],
    green: { cx: 298, cy: 92, rx: 56, ry: 34 },
    tee: { x: 250, y: 700 },
    bunkers: [b(252, 176, 16, 8, -22), b(338, 162, 18, 9, 22)],
    water: [{ cx: 372, cy: 356, rx: 56, ry: 124 }, { cx: 152, cy: 574, rx: 40, ry: 82 }],
    labels: [{ x: 102, y: 330, text: 'OB' }],
  }),
  16: makeHoleMap({
    line: [p(224, 706), p(206, 590), p(220, 470), p(270, 350), p(318, 220), p(310, 94)],
    widths: [40, 56, 64, 72, 64, 48],
    green: { cx: 310, cy: 82, rx: 48, ry: 30 },
    tee: { x: 224, y: 706 },
    bunkers: [b(250, 390, 18, 8, 18), b(322, 240, 17, 8, -18), b(292, 154, 16, 8, 24)],
    water: [{ cx: 138, cy: 514, rx: 42, ry: 72 }],
    labels: [{ x: 92, y: 462, text: 'OB' }],
  }),
  17: makeHoleMap({
    line: [p(226, 710), p(230, 596), p(238, 486), p(256, 360), p(280, 224), p(294, 104)],
    widths: [38, 54, 62, 64, 60, 48],
    green: { cx: 294, cy: 92, rx: 46, ry: 30 },
    tee: { x: 226, y: 710 },
    bunkers: [b(250, 328, 18, 8, 12), b(306, 212, 18, 8, -18), b(342, 172, 15, 8, 22)],
    labels: [{ x: 126, y: 518, text: 'OB' }],
  }),
  18: makeHoleMap({
    line: [p(272, 704), p(248, 590), p(228, 474), p(252, 350), p(294, 224), p(308, 104)],
    widths: [40, 56, 62, 68, 64, 50],
    green: { cx: 308, cy: 92, rx: 48, ry: 30 },
    tee: { x: 272, y: 704 },
    bunkers: [b(264, 256, 18, 8, -18), b(336, 208, 18, 8, 22), b(348, 250, 16, 8, -12), b(218, 438, 16, 8, 18)],
    labels: [{ x: 130, y: 456, text: 'OB' }],
  }),
}

const hananokiMaps = {
  1: makeHoleMap({
    line: [p(134, 706), p(154, 594), p(194, 472), p(240, 352), p(292, 230), p(322, 104)],
    widths: [42, 60, 66, 70, 66, 50],
    green: { cx: 322, cy: 90, rx: 46, ry: 32 },
    tee: { x: 134, y: 706 },
    bunkers: [b(118, 632, 16, 8, 12), b(158, 612, 18, 8, -18)],
    labels: [{ x: 80, y: 476, text: 'OB' }, { x: 338, y: 260, text: 'OB' }],
  }),
  2: makeHoleMap({
    line: [p(150, 706), p(168, 592), p(208, 478), p(262, 358), p(324, 222), p(330, 104)],
    widths: [40, 58, 64, 68, 64, 48],
    green: { cx: 330, cy: 92, rx: 46, ry: 30 },
    tee: { x: 150, y: 706 },
    bunkers: [b(246, 318, 18, 8, -20), b(286, 254, 16, 8, 24), b(298, 184, 16, 8, -16), b(248, 126, 18, 8, 18)],
    labels: [{ x: 78, y: 388, text: 'OB' }, { x: 350, y: 302, text: 'OB' }],
  }),
  3: makeHoleMap({
    line: [p(170, 710), p(160, 598), p(172, 486), p(216, 360), p(274, 226), p(300, 98)],
    widths: [44, 64, 78, 88, 78, 56],
    green: { cx: 300, cy: 84, rx: 50, ry: 32 },
    tee: { x: 170, y: 710 },
    bunkers: [b(336, 314, 16, 8, 24), b(354, 352, 18, 8, -16), b(318, 404, 16, 8, 18), b(274, 222, 18, 8, -18)],
    labels: [{ x: 82, y: 360, text: 'OB' }, { x: 366, y: 420, text: 'OB' }],
  }),
  4: makeHoleMap({
    line: [p(142, 706), p(164, 586), p(198, 462), p(232, 336), p(272, 212), p(300, 96)],
    widths: [40, 56, 62, 66, 62, 48],
    green: { cx: 300, cy: 84, rx: 46, ry: 30 },
    tee: { x: 142, y: 706 },
    bunkers: [b(274, 224, 18, 9, -18), b(314, 178, 16, 8, 18)],
    water: [{ cx: 104, cy: 492, rx: 48, ry: 88 }],
    labels: [{ x: 72, y: 430, text: 'OB' }],
  }),
  5: makeHoleMap({
    line: [p(196, 700), p(210, 560), p(244, 420), p(292, 266), p(322, 112)],
    widths: [44, 78, 104, 112, 80],
    green: { cx: 322, cy: 96, rx: 64, ry: 35 },
    tee: { x: 196, y: 700 },
    bunkers: [b(262, 126, 30, 10, -8), b(372, 138, 20, 8, 18)],
    water: [{ cx: 102, cy: 390, rx: 50, ry: 114 }],
    labels: [{ x: 84, y: 236, text: 'OB' }, { x: 380, y: 280, text: 'OB' }],
  }),
  6: makeHoleMap({
    line: [p(174, 704), p(184, 586), p(220, 462), p(276, 342), p(326, 220), p(318, 98)],
    widths: [38, 54, 62, 66, 62, 48],
    green: { cx: 318, cy: 86, rx: 46, ry: 30 },
    tee: { x: 174, y: 704 },
    bunkers: [b(270, 246, 16, 8, -18), b(314, 180, 14, 8, 18)],
    labels: [{ x: 84, y: 502, text: 'OB' }, { x: 346, y: 352, text: 'OB' }],
  }),
  7: makeHoleMap({
    line: [p(156, 706), p(172, 592), p(214, 478), p(262, 358), p(306, 226), p(312, 104)],
    widths: [38, 54, 60, 64, 60, 46],
    green: { cx: 312, cy: 92, rx: 46, ry: 30 },
    tee: { x: 156, y: 706 },
    bunkers: [b(250, 282, 16, 8, -20), b(334, 210, 18, 8, 20), b(350, 164, 16, 8, -14)],
    labels: [{ x: 92, y: 394, text: 'OB' }, { x: 346, y: 300, text: 'OB' }],
  }),
  8: makeHoleMap({
    line: [p(190, 694), p(206, 550), p(238, 394), p(282, 244), p(312, 106)],
    widths: [44, 74, 92, 90, 64],
    green: { cx: 312, cy: 92, rx: 58, ry: 38 },
    tee: { x: 190, y: 694 },
    bunkers: [b(350, 152, 20, 9, 24)],
    water: [{ cx: 174, cy: 398, rx: 88, ry: 170 }],
    labels: [{ x: 340, y: 218, text: 'OB' }],
  }),
  9: makeHoleMap({
    line: [p(144, 710), p(160, 592), p(190, 476), p(236, 354), p(292, 222), p(310, 98)],
    widths: [44, 66, 78, 86, 76, 56],
    green: { cx: 310, cy: 84, rx: 50, ry: 32 },
    tee: { x: 144, y: 710 },
    bunkers: [b(300, 176, 20, 9, -18), b(330, 210, 20, 9, 18), b(268, 306, 18, 8, -14)],
    water: [{ cx: 118, cy: 652, rx: 54, ry: 42 }],
    labels: [{ x: 84, y: 420, text: 'OB' }],
  }),
  10: makeHoleMap({
    line: [p(138, 708), p(174, 594), p(222, 482), p(278, 360), p(322, 226), p(318, 96)],
    widths: [42, 62, 72, 78, 70, 52],
    green: { cx: 318, cy: 84, rx: 48, ry: 30 },
    tee: { x: 138, y: 708 },
    bunkers: [b(246, 294, 16, 8, -18), b(332, 178, 18, 8, 18), b(186, 482, 16, 8, 14)],
    water: [{ cx: 370, cy: 198, rx: 38, ry: 100 }],
    labels: [{ x: 92, y: 420, text: 'OB' }],
  }),
  11: makeHoleMap({
    line: [p(170, 708), p(188, 594), p(230, 482), p(286, 362), p(326, 226), p(310, 98)],
    widths: [40, 58, 64, 66, 62, 48],
    green: { cx: 310, cy: 86, rx: 46, ry: 30 },
    tee: { x: 170, y: 708 },
    bunkers: [b(244, 316, 18, 8, -16), b(284, 216, 16, 8, 18)],
    labels: [{ x: 94, y: 432, text: 'OB' }, { x: 330, y: 228, text: 'OB' }],
  }),
  12: makeHoleMap({
    line: [p(150, 708), p(174, 592), p(214, 476), p(270, 358), p(324, 222), p(320, 98)],
    widths: [40, 56, 64, 70, 64, 48],
    green: { cx: 320, cy: 86, rx: 46, ry: 30 },
    tee: { x: 150, y: 708 },
    bunkers: [b(256, 246, 16, 8, -18), b(298, 194, 16, 8, 18)],
    water: [{ cx: 128, cy: 142, rx: 52, ry: 38 }],
    labels: [{ x: 86, y: 358, text: 'OB' }],
  }),
  13: makeHoleMap({
    line: [p(180, 696), p(202, 550), p(230, 394), p(274, 244), p(304, 104)],
    widths: [42, 72, 86, 84, 60],
    green: { cx: 304, cy: 90, rx: 52, ry: 34 },
    tee: { x: 180, y: 696 },
    bunkers: [b(250, 126, 19, 9, -18), b(344, 134, 18, 8, 18)],
    labels: [{ x: 102, y: 330, text: 'OB' }],
  }),
  14: makeHoleMap({
    line: [p(170, 708), p(196, 592), p(242, 482), p(310, 374), p(344, 238), p(310, 100)],
    widths: [40, 58, 66, 70, 64, 48],
    green: { cx: 310, cy: 86, rx: 46, ry: 30 },
    tee: { x: 170, y: 708 },
    bunkers: [b(268, 334, 16, 8, 18), b(322, 216, 16, 8, -18), b(348, 170, 16, 8, 20)],
    water: [{ cx: 126, cy: 426, rx: 36, ry: 84 }],
    labels: [{ x: 82, y: 394, text: 'RPA' }],
  }),
  15: makeHoleMap({
    line: [p(228, 696), p(236, 552), p(250, 394), p(274, 242), p(298, 104)],
    widths: [42, 72, 86, 86, 60],
    green: { cx: 298, cy: 90, rx: 54, ry: 35 },
    tee: { x: 228, y: 696 },
    bunkers: [b(242, 136, 18, 9, -18), b(346, 136, 20, 9, 18), b(330, 192, 18, 8, -12)],
    labels: [{ x: 102, y: 318, text: 'OB' }, { x: 342, y: 282, text: 'OB' }],
  }),
  16: makeHoleMap({
    line: [p(146, 708), p(170, 592), p(214, 476), p(266, 360), p(316, 226), p(304, 100)],
    widths: [40, 58, 66, 70, 64, 48],
    green: { cx: 304, cy: 88, rx: 46, ry: 30 },
    tee: { x: 146, y: 708 },
    bunkers: [b(278, 198, 18, 8, 18), b(326, 172, 16, 8, -18), b(192, 516, 18, 8, 18)],
    labels: [{ x: 82, y: 400, text: 'OB' }, { x: 330, y: 326, text: 'OB' }],
  }),
  17: makeHoleMap({
    line: [p(156, 710), p(180, 596), p(230, 486), p(286, 366), p(326, 228), p(306, 98)],
    widths: [42, 62, 74, 82, 70, 52],
    green: { cx: 306, cy: 84, rx: 50, ry: 32 },
    tee: { x: 156, y: 710 },
    bunkers: [b(250, 372, 22, 10, 18), b(350, 218, 18, 8, -18), b(286, 160, 18, 8, 18)],
    labels: [{ x: 94, y: 444, text: 'OB' }],
  }),
  18: makeHoleMap({
    line: [p(142, 708), p(168, 594), p(206, 480), p(260, 358), p(312, 224), p(324, 98)],
    widths: [42, 60, 68, 72, 66, 50],
    green: { cx: 324, cy: 86, rx: 48, ry: 30 },
    tee: { x: 142, y: 708 },
    bunkers: [b(304, 204, 18, 8, -18), b(356, 172, 18, 8, 18)],
    water: [{ cx: 248, cy: 122, rx: 54, ry: 40 }],
    labels: [{ x: 92, y: 366, text: 'OB' }],
  }),
}

const courseMaps = {
  mizunami: mizunamiMaps,
  hananoki: hananokiMaps,
}

export const yardageCourses = [
  {
    id: 'golf5-mizunami',
    date: '10/8',
    name: '골프5 컨트리 미즈나미 코스',
    shortName: 'Mizunami',
    tee: 'Regular Tee',
    dataStatus: '캡쳐 기준 수집 완료',
    courseNames: ['OUT', 'IN'],
    guideUrl: 'https://maps.app.goo.gl/ytEXsrV4cVJZuNfy5?g_st=akt',
    guideLabel: '위치 링크',
    note: '레귤러티 기준 Yard / Par / HDCP를 반영했습니다. 홀맵은 원본 이미지를 복제하지 않고 새로 그리는 샘플입니다.',
    holes: buildHoles('mizunami', [
      { hole: 1, par: 4, hdcp: 9, distanceYd: 391, memo: '티샷은 페어웨이 중앙 우측이 안전. 그린 주변 벙커를 피하고 중앙 공략.' },
      { hole: 2, par: 5, hdcp: 3, distanceYd: 548, memo: '긴 파5. 세컨드 욕심보다 세 번째 샷을 편하게 남긴다.' },
      { hole: 3, par: 4, hdcp: 15, distanceYd: 334, memo: '짧은 파4. 방향성 우선, 그린 앞 벙커를 피한다.' },
      { hole: 4, par: 3, hdcp: 13, distanceYd: 166, memo: '중거리 파3. 그린 중앙을 보고 안전하게 공략.' },
      { hole: 5, par: 5, hdcp: 1, distanceYd: 476, memo: '핸디캡 1번 홀. 무리한 투온보다 안정적인 레이업.' },
      { hole: 6, par: 4, hdcp: 7, distanceYd: 388, memo: '도그렉성 파4. 티샷 낙하지점과 벙커 위치 확인.' },
      { hole: 7, par: 4, hdcp: 17, distanceYd: 312, memo: '짧은 파4. 티샷 클럽 선택으로 거리와 방향을 조절.' },
      { hole: 8, par: 3, hdcp: 11, distanceYd: 169, memo: '파3. 그린 주변 벙커를 피해 캐리 거리 확인.' },
      { hole: 9, par: 4, hdcp: 5, distanceYd: 386, memo: '전반 마무리 파4. 세컨드가 길 수 있어 티샷 거리 확보.' },
      { hole: 10, par: 5, hdcp: 16, distanceYd: 471, memo: '후반 시작 파5. 물과 벙커를 피해 왼쪽보다 중앙 공략.' },
      { hole: 11, par: 4, hdcp: 4, distanceYd: 430, memo: '긴 파4. 티샷 방향이 중요하고 세컨드는 그린 입구를 본다.' },
      { hole: 12, par: 3, hdcp: 10, distanceYd: 198, memo: '긴 파3. 한 클럽 여유 있게 보고 짧은 미스를 피한다.' },
      { hole: 13, par: 4, hdcp: 14, distanceYd: 378, memo: '도그렉 파4. 페어웨이 중앙 확보 후 그린 중앙 공략.' },
      { hole: 14, par: 4, hdcp: 2, distanceYd: 419, memo: '난도 높은 파4. 티샷은 안전한 방향, 세컨드는 무리 금지.' },
      { hole: 15, par: 3, hdcp: 8, distanceYd: 188, memo: '워터 해저드 주의. 핀보다 안전한 그린 면을 본다.' },
      { hole: 16, par: 5, hdcp: 6, distanceYd: 508, memo: '긴 파5. 중간 해저드와 벙커를 피하며 세 번째 샷 각도 확보.' },
      { hole: 17, par: 4, hdcp: 12, distanceYd: 389, memo: '파4. 페어웨이 적중 우선, 그린 주변 벙커 주의.' },
      { hole: 18, par: 4, hdcp: 18, distanceYd: 324, memo: '마무리 파4. 짧지만 좌우 리스크를 피하고 중앙 공략.' },
    ]),
  },
  {
    id: 'hananoki',
    date: '10/9',
    name: '하나노키 골프 클럽',
    shortName: 'Hananoki',
    tee: 'White Tee',
    dataStatus: '공식 확인',
    courseNames: ['OUT', 'IN'],
    guideUrl: 'https://www.pacificgolf.co.jp/hananoki/course.asp',
    guideLabel: '공식 코스가이드',
    note: 'PGM 공식 코스가이드의 White tee 기준 Yard / Par / HDCP를 반영했습니다. 미터 표기는 앱에서 환산한 값입니다.',
    holes: buildHoles('hananoki', [
      { hole: 1, par: 4, hdcp: 9, distanceYd: 398, memo: '포워드 오른쪽으로 진행. 두 번째 지점은 왼쪽 경사 주의.' },
      { hole: 2, par: 4, hdcp: 15, distanceYd: 381, memo: '오른쪽 공략이 유리. 왼쪽 벙커와 OB를 피한다.' },
      { hole: 3, par: 5, hdcp: 3, distanceYd: 533, memo: '230yd 이내는 중앙~오른쪽, 그 이상은 왼쪽 측면 유지.' },
      { hole: 4, par: 4, hdcp: 7, distanceYd: 352, memo: '포워드 왼쪽이 좋은 위치. 런치 게임이라 큰 클럽 가능.' },
      { hole: 5, par: 3, hdcp: 13, distanceYd: 154, memo: '가로로 긴 그린. 첫 번째 핀과 뒤쪽 OB를 조심.' },
      { hole: 6, par: 4, hdcp: 1, distanceYd: 336, memo: '거리보다 방향 집중. 전체적으로 왼쪽 경사.' },
      { hole: 7, par: 4, hdcp: 5, distanceYd: 350, memo: '앞중앙 조준. 좁은 페어웨이로 방향 제어가 중요.' },
      { hole: 8, par: 3, hdcp: 17, distanceYd: 132, memo: '그린이 세 층. 거리와 방향을 모두 확인.' },
      { hole: 9, par: 5, hdcp: 11, distanceYd: 476, memo: '앞중앙 공략. 그린 앞 벙커와 출발 중 큰 클럽 선택 주의.' },
      { hole: 10, par: 5, hdcp: 16, distanceYd: 517, memo: '왼쪽 도그렉 파5. OB와 오른쪽 연못을 조심.' },
      { hole: 11, par: 4, hdcp: 10, distanceYd: 378, memo: '부드러운 오른쪽 도그렉. 앞쪽 벙커를 겨냥하면 좋다.' },
      { hole: 12, par: 4, hdcp: 4, distanceYd: 405, memo: '왼쪽 OB 주의. 왼쪽 벙커를 넘기는 방향이 좋다.' },
      { hole: 13, par: 3, hdcp: 8, distanceYd: 158, memo: '앞 왼쪽은 벙커. 오른쪽에서 공략하는 것이 안전.' },
      { hole: 14, par: 4, hdcp: 2, distanceYd: 334, memo: '오른쪽 도그렉. 거리 유지 후 앞으로 나아가는 것이 중요.' },
      { hole: 15, par: 3, hdcp: 14, distanceYd: 161, memo: '양쪽 벙커 주의. 특히 왼쪽 벙커는 높이 차가 있다.' },
      { hole: 16, par: 4, hdcp: 6, distanceYd: 376, memo: '왼쪽 도그렉. 너무 멀면 OB 위험, 방향에 집중.' },
      { hole: 17, par: 5, hdcp: 18, distanceYd: 476, memo: '중앙에서 타워 쪽으로 공략. 그린 양쪽 벙커 주의.' },
      { hole: 18, par: 4, hdcp: 12, distanceYd: 408, memo: '클럽하우스 전망대 방향. 두 번째 면은 왼쪽 연못과 벙커 주의.' },
    ]),
  },
]
