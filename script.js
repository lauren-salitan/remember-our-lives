function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Main initialization
window.onload = function () {
  const personKey = getQueryParam("person") || "grandpa";
  const person = people[personKey];
  const heroSection = document.getElementById("hero");

  if (!person) {
    alert("This memorial page does not exist.");
    return;
  }

  // Set background image if available
  if (person.background_image) {
    heroSection.style.backgroundImage = `url('${person.background_image}')`;
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.position = "relative";
    heroSection.innerHTML =
      `<div class="hero-overlay"></div>` + heroSection.innerHTML;
  }

  // Populate basic info
  document.getElementById("name").innerText = person.name;
  document.getElementById(
    "dates"
  ).innerText = `${person.birthDate} – ${person.deathDate}`;
  document.getElementById("quote").innerText = `"${person.quote}"`;

  // Photo carousel
  const photoContainer = document.getElementById("photo-carousel");
  photoContainer.innerHTML = "";

  // Duplicate photos for smooth scrolling
  person.photos.forEach(addImg);
  person.photos.forEach(addImg);

  function addImg(url) {
    const img = document.createElement("img");
    img.src = url.startsWith("/") ? url.slice(1) : url;
    img.alt = "Memory photo";
    photoContainer.appendChild(img);
  }

  // Auto-scroll carousel
  const speed = 0.3;
  let scrollPos = 0;

  function glide() {
    scrollPos += speed;
    if (scrollPos >= photoContainer.scrollWidth / 2) {
      scrollPos = 0;
    }
    photoContainer.scrollLeft = scrollPos;
    requestAnimationFrame(glide);
  }
  requestAnimationFrame(glide);

  // Obituary
  // document.getElementById("obituary-text").innerText = person.obituary;
  // if (person.obituary_2) {
  //   document.getElementById("obituary_2-text").innerText = person.obituary_2;
  // }
  const obitEl = document.getElementById("obituary-text");
  obitEl.innerHTML = `
    To read ${person.name}'s obituary in full, please see
    <a class="link" href="${person.obituaryLink}" target="_blank">here</a>.
  `;

  // append the clickable screenshot
  obitEl.innerHTML += `
    <a href="${person.obituaryLink}" target="_blank">
      <img
        src="${person.obituaryImage}"
        alt="${person.name} obituary screenshot"
        class="obit-image"
      />
    </a>
  `;

  // Service details
  document.getElementById("service-date").innerText = person.service.date;
  if (person.service.time) {
    document.getElementById("service-time").innerText = person.service.time;
  }
  document.getElementById("service-location").innerText =
    person.service.location;
  document.getElementById("service-address").innerText = person.service.address;
  document.getElementById("service-map").src = person.service.mapEmbed;


  // const notes = document.getElementById("service-notes");
  // notes.innerHTML = "";
  // person.service.notes.forEach((entry) => {
  //   const li = document.createElement("li");
  //   li.innerHTML = `
  //   <div class="note-text">${entry.note}</div>
  //   `;
  //   notes.appendChild(li);
  // });
  // document.getElementById("service-notes").innerHTML = person.service.notes;


  const notesEl = document.getElementById("service-notes");
  notesEl.innerHTML = "";
  person.service.notes.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry.note;
     notesEl.appendChild(li);
   });

  // Comments
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
        if (comment.author && comment.text) {
          const p = document.createElement("p");
          p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
          commentFeed.appendChild(p);
        }
      });
      btn.remove();
    };
    commentFeed.appendChild(btn);
  }

  // Timeline
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

  // Initialize family tree with delay to ensure DOM is ready
  // setTimeout(initializeFamilyTree, 100);
};
