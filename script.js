function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderTreeSection(label, members) {
  if (!members || members.length === 0) return null;

  const section = document.createElement("div");
  section.classList.add("tree-subsection");

  const title = document.createElement("h4");
  title.innerText = label.charAt(0).toUpperCase() + label.slice(1);
  section.appendChild(title);

  const list = document.createElement("p");
  list.innerText = Array.isArray(members) ? members.join(", ") : members;
  section.appendChild(list);

  return section;
}

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

  /* build the strip twice */
  person.photos.forEach(addImg);
  person.photos.forEach(addImg);

  function addImg(url){
    const img = document.createElement("img");
    img.src = url.startsWith("/") ? url.slice(1) : url;
    img.alt = "Memory photo";
    photoContainer.appendChild(img);
  }

/* smooth, continuous scroll */
  const speed = 0.3;        // pixels per frame  (≈ 36 px/s)
  let   scrollPos = 0;

  function glide(){
   scrollPos += speed;
   if(scrollPos >= photoContainer.scrollWidth / 2){
     scrollPos = 0;        // jump back to the start of copy A
   }
   photoContainer.scrollLeft = scrollPos;
    requestAnimationFrame(glide);
  }
  requestAnimationFrame(glide);
  // const doubledPhotos = person.photos.concat(person.photos);
  // doubledPhotos.forEach((url, index) => {
  //   const img = document.createElement("img");
  //   img.src = url.startsWith("/") ? url.slice(1) : url;
  //   img.alt = `Memory photo ${index + 1}`;
  //   photoContainer.appendChild(img);
  // });

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

  const familyTreeContainer = document.getElementById("family-tree-container");
  familyTreeContainer.innerHTML = "";
  Object.entries(person.familyTree).forEach(([label, members]) => {
    const section = renderTreeSection(label, members);
    if (section) familyTreeContainer.appendChild(section);
  });

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


//   const timelineList = document.getElementById("timeline-list");
//   timelineList.innerHTML = "";
//   person.timeline.forEach((entry) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<strong>${entry.year}:</strong> ${entry.event}`;
//     timelineList.appendChild(li);
//   });
};
  
