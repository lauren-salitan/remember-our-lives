// family-tree.js

// ─── your node data ───────────────────────────────
const nodes = [
  {
    id: 1,
    pids: [2],
    mid: 4,
    fid: 3,
    name: "Robert Betts\n(1935 - 2024)",
    tags: ["focus"],
  },
  { id: 3, pids: [4], name: "Frank Betts\n(1905 - 1985)" },
  { id: 4, pids: [3], name: "Phyllis Betts\n(1905 - 1985)" },
  { id: 2, pids: [1], name: "Sherrill Betts\n(1939 - )" },

  { id: 5, mid: 1, fid: 2, name: "Christopher Betts\n(1965 - )" },
  { id: 7, mid: 5, fid: 6, name: "Hayley Betts\n(1995 - )" },
  { id: 8, mid: 5, fid: 6, name: "Julia Betts\n(1997 - )" },

  {
    id: 9,
    mid: 1,
    fid: 2,
    pids: [10],
    name: "Stephanie Jamieson\n(1967 - )",
  },
  { id: 10, pids: [9], name: "Mark Jamieson" },
  { id: 11, mid: 9, fid: 10, name: "Adam Jamieson\n(1998 - )" },
  { id: 12, mid: 9, fid: 10, name: "Nora Jamieson\n(2000 - )" },
  { id: 13, mid: 9, fid: 10, name: "Grant Jamieson\n(2004 - )" },

  {
    id: 14,
    mid: 1,
    fid: 2,
    pids: [15],
    name: "Valerie Salitan\n(1969 - )",
  },
  { id: 15, pids: [14], name: "Stephen Salitan\n(1946 - )" },
  { id: 16, mid: 14, fid: 15, name: "Sara Salitan\n(1998 - )" },
  { id: 17, mid: 14, fid: 15, name: "Lauren Salitan\n(2001 - )" },
];

//   // 1) clone Hugo (for all its nice defaults)
//   const mySquare = Object.assign({}, FamilyTree.templates.hugo);

//   // 2) override the <rect> to be narrower
//   mySquare.node = `
//     <rect x="1" y="1" width="160" height="60" rx="6" ry="6"
//           fill="#fff" stroke="var(--primary)" stroke-width="2"></rect>
//   `;

//   // 3) render two lines of text, centered in that box
//   //    – field_0 (name) up top
//   mySquare.field_0 = `
//     <text width="158" x="80" y="24"
//           text-anchor="middle"
//           style="font-size:14px; fill:var(--primary); font-family:'Old Standard TT';">
//       {val}
//     </text>
//   `;
//   //    – field_1 (date) below it
//   mySquare.field_1 = `
//     <text width="158" x="80" y="44"
//           text-anchor="middle"
//           style="font-size:12px; fill:var(--primary); font-family:'Old Standard TT';">
//       {val}
//     </text>
//   `;

// before anything else
nodes.forEach((n) => {
  // if you already have `\n`, split on that:
  if (n.name.includes("\n")) {
    const [nm, dt] = n.name.split("\n");
    n.name = nm.trim(); // keep just the name
    n.date = dt.trim(); // keep just the "(YYYY - YYYY)"
  } else {
    // fallback—if no newline, put an empty date
    n.date = "";
  }
});

///
// 1) register your clone under the name "mySquare"
FamilyTree.templates.mySquare = Object.assign({}, FamilyTree.templates.hugo);

// 2) override the SVG bits on that registered template
FamilyTree.templates.mySquare.node = `
    <rect x="0" y="0" width="130" height="50" rx="6" ry="6"
          fill="#fff" stroke="var(--primary)" stroke-width="2"></rect>
  `;

FamilyTree.templates.mySquare.field_0 = `
    <text width="100" x="65" y="24" text-anchor="middle"
          style="font-size:14px; fill:var(--primary); font-family:'Old Standard TT';">
      {val}
    </text>
  `;

FamilyTree.templates.mySquare.field_1 = `
    <text width="20" x="65" y="44" text-anchor="middle"
          style="font-size:12px; fill:var(--primary); font-family:'Old Standard TT';">
      {val}
    </text>
  `;

// Initialize family tree
function initializeFamilyTree() {
  const treeContainer = document.getElementById("myFamilyTree");

  // Check if FamilyTree is available
  if (typeof FamilyTree === "undefined") {
    console.warn("FamilyTree library not loaded, creating fallback tree");
    createFallbackFamilyTree();
    return;
  }

  try {
    new FamilyTree(treeContainer, {
      nodeBinding: {
        field_0: "name",
       // field_1: "date",
      },
      nodes: nodes,
      primaryID: 1,
      mode: "dark",
      template: "tommy",
      enableSearch: false,
      toolbar: {
        zoom: true,
        fit: true,
        expandAll: false,
      },
      nodeMenu: false,
      nodeTreeMenu: false,
      miniMap: false,
      mouseScrool: FamilyTree.action.zoom,
      collapse: {},
      expand: {},
      orientation: FamilyTree.orientation.top,
      layout: FamilyTree.layout.normal,
      nodeSize: { width: 120, height: 50 },
      levelSeparation: 50, // vertical gap (parent→child)
      siblingSeparation: 10, // horizontal gap (sibs)
    //   subtreeSeparation: 100, // gap between sub-families
      minPartnerSeparation: 10,
      scaleInitial: FamilyTree.match.boundary, // start zoomed-out a bit
      scaleMax: 1,
    //   scaleMin: 0.5,
    });
  } catch (error) {
    console.error("Error initializing FamilyTree:", error);
    createFallbackFamilyTree();
  }
}

// Fallback family tree if FamilyTree JS fails
function createFallbackFamilyTree() {
  const treeContainer = document.getElementById("myFamilyTree");
  treeContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h3 style="color: var(--primary); margin-bottom: 2rem;">Betts Family Tree</h3>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="background: #fff; padding: 1rem; border-radius: 8px; border: 2px solid var(--primary); font-weight: bold;">
              Robert F Betts (1935-2024) & Sherrill T (Rutledge) Betts (1939-)
            </div>
            <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
              <div style="text-align: center;">
                <div style="background: #f9f9f9; padding: 0.8rem; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 0.5rem;">
                  Christopher Betts (1965-)
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                  Children: Hayley (1995), Julia (1997)
                </div>
              </div>
              <div style="text-align: center;">
                <div style="background: #f9f9f9; padding: 0.8rem; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 0.5rem;">
                  Stephanie Jamieson (1967-)
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                  Children: Adam (1998), Nora (2000), Grant (2004)
                </div>
              </div>
              <div style="text-align: center;">
                <div style="background: #f9f9f9; padding: 0.8rem; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 0.5rem;">
                  Valerie Salitan (1969-)
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                  Children: Sara (1998), Lauren (2001)
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
}

// kick it off after the page loads
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeFamilyTree, 100);
});
