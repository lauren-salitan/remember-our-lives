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

  if (!person) {
    alert("This memorial page does not exist.");
    return;
  }

  // Hero
  document.getElementById("name").innerText = person.name;
  document.getElementById("dates").innerText = `${person.birthDate} – ${person.deathDate}`;
  document.getElementById("quote").innerText = `"${person.quote}"`;

  // Photo carousel
  const photoContainer = document.getElementById("photo-carousel");
  photoContainer.innerHTML = "";
  person.photos.forEach(url => {
    const img = document.createElement("img");
    img.src = url.startsWith("/") ? url.slice(1) : url; // strip leading slash
    img.alt = "Memory photo";
    photoContainer.appendChild(img);
  });

  // Obituary
  document.getElementById("obituary-text").innerText = person.obituary;

  // Service info
  document.getElementById("service-date").innerText = person.service.date;
  document.getElementById("service-time").innerText = person.service.time;
  document.getElementById("service-location").innerText = person.service.location;
  document.getElementById("service-map").src = person.service.mapEmbed;
  document.getElementById("service-notes").innerText = person.service.notes;

  // Comments
  const commentFeed = document.getElementById("comment-feed");
  commentFeed.innerHTML = "";
  person.comments.forEach(comment => {
    if (comment.author && comment.text) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      commentFeed.appendChild(p);
    }
  });

  // Family Tree (flexible rendering)
  const familyTreeContainer = document.getElementById("family-tree-container");
  familyTreeContainer.innerHTML = "";
  Object.entries(person.familyTree).forEach(([label, members]) => {
    const section = renderTreeSection(label, members);
    if (section) familyTreeContainer.appendChild(section);
  });

  // Timeline
  const timelineList = document.getElementById("timeline-list");
  timelineList.innerHTML = "";
  person.timeline.forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.year}:</strong> ${entry.event}`;
    timelineList.appendChild(li);
  });
};
