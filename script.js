function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const nodes = [
  { id: 1,  pids: [2],        name: "Robert F Betts (1935 - 2024)" },
  { id: 2,                    name: "Sherrill T (Rutledge) Betts (1939 - )" },

  { id: 3,  mid: 1, fid: 4,   name: "Frank J C Betts (1905 - 1985)" },
  { id: 4,                    name: "Phyllis W (Martin) Betts (1905 - 1985)" },

  { id: 5,  mid: 1, fid: 2, pids: [6],  name: "Christopher Betts (1965  - )" },
  { id: 6,                    name: "—" },
  { id: 7,  mid: 5, fid: 6,   name: "Hayley Betts (1995  - )" },
  { id: 8,  mid: 5, fid: 6,   name: "Julia Betts (1997  - )" },

  { id: 9,  mid: 1, fid: 2, pids: [10], name: "Stephanie (Betts) Jamieson (1967  - )" },
  { id:10,                    name: "Mark Jamieson" },
  { id:11, mid: 9, fid:10,    name: "Adam Jamieson (1998  - )" },
  { id:12, mid: 9, fid:10,    name: "Nora Jamieson (2000  - )" },
  { id:13, mid: 9, fid:10,    name: "Grant Jamieson (2004  - )" },

  { id:14, mid: 1, fid: 2, pids: [15], name: "Valerie Kay (Betts) Salitan (1969  - )" },
  { id:15,                    name: "Stephen David Salitan (1946  - )" },
  { id:16, mid:14, fid:15,    name: "Sara Victoria Salitan (1998  - )" },
  { id:17, mid:14, fid:15,    name: "Lauren Betts Salitan (2001  - )" }
];

window.onload = function () {
  const personKey = getQueryParam("person") || "jane";
  const person = people[personKey];
  const heroSection = document.getElementById("hero");

  if (person.background_image) {
    heroSection.style.backgroundImage = `url('${person.background_image}')`;
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.position = "relative";
    heroSection.innerHTML =
      `<div class="hero-overlay"></div>` + heroSection.innerHTML;
  }

  if (!person) {
    alert("This memorial page does not exist.");
    return;
  }

  document.getElementById("name").innerText = person.name;
  document.getElementById(
    "dates"
  ).innerText = `${person.birthDate} – ${person.deathDate}`;
  document.getElementById("quote").innerText = `"${person.quote}"`;

  const photoContainer = document.getElementById("photo-carousel");
  photoContainer.innerHTML = "";

  person.photos.forEach(addImg);
  person.photos.forEach(addImg);

  function addImg(url){
    const img = document.createElement("img");
    img.src = url.startsWith("/") ? url.slice(1) : url;
    img.alt = "Memory photo";
    photoContainer.appendChild(img);
  }

  const speed = 0.3;       
  let   scrollPos = 0;

  function glide(){
   scrollPos += speed;
   if(scrollPos >= photoContainer.scrollWidth / 2){
     scrollPos = 0;       
   }
   photoContainer.scrollLeft = scrollPos;
    requestAnimationFrame(glide);
  }
  requestAnimationFrame(glide);


  document.getElementById("obituary-text").innerText = person.obituary;
  document.getElementById("obituary_2-text").innerText = person.obituary_2;
  document.getElementById("service-date").innerText = person.service.date;
  // document.getElementById("service-time").innerText = person.service.time;
  document.getElementById("service-location").innerText =
    person.service.location;
    document.getElementById("service-address").innerText =
      person.service.address;
  document.getElementById("service-map").src = person.service.mapEmbed;
  document.getElementById("service-notes").innerText = person.service.notes;

  const commentFeed = document.getElementById("comment-feed");
  commentFeed.innerHTML = "";

  const limit = 4;
  person.comments.slice(0, limit).forEach((comment, index) => {
    if (comment.author && comment.text) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      if (index === 3) p.style.opacity = "0.5";
      commentFeed.appendChild(p);
    }
  });

  if (person.comments.length > limit) {
    const btn = document.createElement("button");
    btn.innerText = "Show All Comments";
    btn.className = "show-comments-btn";
    btn.onclick = () => {
      commentFeed.innerHTML = "";
      person.comments.forEach((comment) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
        commentFeed.appendChild(p);
      });
      btn.remove();
    };
    commentFeed.appendChild(btn);
  }

  const timelineList = document.getElementById("timeline-list");
  timelineList.className = "timeline-split";
  timelineList.innerHTML = "";

  person.timeline.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="timeline-date">${entry.year}</div>
      <div class="timeline-line"></div>
      <div class="timeline-event">${entry.event}</div>
    `;
    timelineList.appendChild(li);
  });

  new FamilyTree(document.getElementById("myFamilyTree"), {
    nodeBinding: { field_0: "name" },
    nodes
  });
};