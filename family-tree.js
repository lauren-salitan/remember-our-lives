// family-tree.js

// ─── your node data ───────────────────────────────
const nodes = [
  { id: 3, name: "Frank J C Betts\n(1905 - 1985)" },
  { id: 4, name: "Phyllis W (Martin) Betts\n(1905 - 1985)" },

  {
    id: 1,
    pids: [2],
    mid: 4,
    fid: 3,
    name: "Robert F Betts\n(1935 - 2024)",
    tags: ["focus"],
  },
  // { id: 1, pids: [2], name: "Robert F Betts\n(1935 - 2024)", tags: ["focus"] },
  { id: 2, name: "Sherrill T (Rutledge) Betts\n(1939 - )" },

  { id: 5, mid: 1, fid: 2, pids: [6], name: "Christopher Betts\n(1965 - )" },
  { id: 6, name: "Partner" },
  { id: 7, mid: 5, fid: 6, name: "Hayley Betts\n(1995 - )" },
  { id: 8, mid: 5, fid: 6, name: "Julia Betts\n(1997 - )" },

  {
    id: 9,
    mid: 1,
    fid: 2,
    pids: [10],
    name: "Stephanie (Betts) Jamieson\n(1967 - )",
  },
  { id: 10, name: "Mark Jamieson" },
  { id: 11, mid: 9, fid: 10, name: "Adam Jamieson\n(1998 - )" },
  { id: 12, mid: 9, fid: 10, name: "Nora Jamieson\n(2000 - )" },
  { id: 13, mid: 9, fid: 10, name: "Grant Jamieson\n(2004 - )" },

  {
    id: 14,
    mid: 1,
    fid: 2,
    pids: [15],
    name: "Valerie Kay (Betts) Salitan\n(1969 - )",
  },
  { id: 15, name: "Stephen David Salitan\n(1946 - )" },
  { id: 16, mid: 14, fid: 15, name: "Sara Victoria Salitan\n(1998 - )" },
  { id: 17, mid: 14, fid: 15, name: "Lauren Betts Salitan\n(2001 - )" },
];

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
      },
      nodes: nodes,
      mode: "dark",
      template: "hugo",
      enableSearch: false,
      toolbar: {
        zoom: true,
        fit: true,
        expandAll: false,
      },
      nodeTreeMenu: false,
      miniMap: false,
      mouseScrool: FamilyTree.action.zoom,
      collapse: {},
      expand: {},
      orientation: FamilyTree.orientation.top,
      layout: FamilyTree.layout.normal,
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
