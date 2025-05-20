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
    // Optional: overlay for text readability
    heroSection.innerHTML = `
    <div class="hero-overlay"></div>
    ${heroSection.innerHTML}
    `;
  }

  if (!person) {
    alert("This memorial page does not exist.");
    return;
  }

  // Hero
  document.getElementById("name").innerText = person.name;
  document.getElementById(
    "dates"
  ).innerText = `${person.birthDate} – ${person.deathDate}`;
  document.getElementById("quote").innerText = `"${person.quote}"`;

  // Photo carousel
  // const photoContainer = document.getElementById("photo-carousel");
  // photoContainer.innerHTML = "";
  // person.photos.forEach(url => {
  //   const img = document.createElement("img");
  //   img.src = url.startsWith("/") ? url.slice(1) : url; // strip leading slash
  //   img.alt = "Memory photo";
  //   photoContainer.appendChild(img);
  // });

  // let currentPhotoIndex = 0;

  // function showPhoto(index) {
  //   const photoContainer = document.getElementById("photo-carousel");
  //   photoContainer.innerHTML = "";
  //   const img = document.createElement("img");
  //   img.src = person.photos[index];
  //   img.alt = "Memory photo";
  //   photoContainer.appendChild(img);
  // }

  // function rotatePhotos() {
  //   currentPhotoIndex = (currentPhotoIndex + 1) % person.photos.length;
  //   showPhoto(currentPhotoIndex);
  // }

  // showPhoto(0);
  // setInterval(rotatePhotos, 4000); // Change photo every 4s

  const photoContainer = document.getElementById("photo-carousel");
  photoContainer.innerHTML = "";

  person.photos.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url.startsWith("/") ? url.slice(1) : url;
    img.alt = `Memory photo ${index + 1}`;
    photoContainer.appendChild(img);
  });

  let scrollAmount = 0;
  const scrollStep = 300; // adjust based on image width

  setInterval(() => {
    scrollAmount += scrollStep;
    if (scrollAmount >= photoContainer.scrollWidth) {
      scrollAmount = 0;
    }
    photoContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 2500);

  // Obituary
  document.getElementById("obituary-text").innerText = person.obituary;

  // Service info
  document.getElementById("service-date").innerText = person.service.date;
  document.getElementById("service-time").innerText = person.service.time;
  document.getElementById("service-location").innerText =
    person.service.location;
  document.getElementById("service-map").src = person.service.mapEmbed;
  document.getElementById("service-notes").innerText = person.service.notes;

  // Comments
  const commentFeed = document.getElementById("comment-feed");
  commentFeed.innerHTML = "";
  // person.comments.forEach(comment => {
  //   if (comment.author && comment.text) {
  //     const p = document.createElement("p");
  //     p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
  //     commentFeed.appendChild(p);
  //   }
  // });
  const limit = 5;
  person.comments.slice(0, limit).forEach((comment, index, arr) => {
    if (comment.author && comment.text) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      if (index === limit - 1 && person.comments.length > limit) {
        p.style.opacity = 0.7;
        p.classList.add("last-visible-comment");
      }
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
  person.timeline.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.year}:</strong> ${entry.event}`;
    timelineList.appendChild(li);
  });
};
