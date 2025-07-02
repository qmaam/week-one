// Utility to create unique IDs for elements
const uid = (() => {
  let i = 0;
  return () => ++i;
})();

function addEducation() {
  const id = uid();
  const wrapper = document.getElementById('education-wrapper');
  const div = document.createElement('div');
  div.className = 'education-item';
  div.innerHTML = `
    <div class="grid-2">
      <label>
        Degree (EN)
        <input type="text" id="degree-en-${id}" />
      </label>
      <label>
        Degree (SO)
        <input type="text" id="degree-so-${id}" />
      </label>
      <label>
        Institution
        <input type="text" id="institution-${id}" />
      </label>
      <label>
        Period
        <input type="text" id="period-${id}" placeholder="2018 - 2022" />
      </label>
    </div>`;
  wrapper.appendChild(div);
}

function addExperience() {
  const id = uid();
  const wrapper = document.getElementById('experience-wrapper');
  const div = document.createElement('div');
  div.className = 'experience-item';
  div.innerHTML = `
    <div class="grid-2">
      <label>
        Job Title (EN)
        <input type="text" id="job-en-${id}" />
      </label>
      <label>
        Job Title (SO)
        <input type="text" id="job-so-${id}" />
      </label>
      <label>
        Company
        <input type="text" id="company-${id}" />
      </label>
      <label>
        Period
        <input type="text" id="exp-period-${id}" placeholder="2020 - Present" />
      </label>
    </div>
    <label>
      Description (EN)
      <textarea id="exp-desc-en-${id}" rows="2"></textarea>
    </label>
    <label>
      Description (SO)
      <textarea id="exp-desc-so-${id}" rows="2"></textarea>
    </label>`;
  wrapper.appendChild(div);
}

function addLanguage() {
  const id = uid();
  const wrapper = document.getElementById('language-wrapper');
  const div = document.createElement('div');
  div.className = 'language-item';
  div.innerHTML = `
    <div class="grid-2">
      <label>
        Language
        <input type="text" id="lang-name-${id}" placeholder="Somali" />
      </label>
      <label>
        Proficiency
        <select id="lang-level-${id}">
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Native">Native</option>
        </select>
      </label>
    </div>`;
  wrapper.appendChild(div);
}

function addReference() {
  const id = uid();
  const wrapper = document.getElementById('reference-wrapper');
  const div = document.createElement('div');
  div.className = 'reference-item';
  div.innerHTML = `
    <div class="grid-2">
      <label>
        Name
        <input type="text" id="ref-name-${id}" />
      </label>
      <label>
        Title / Relation
        <input type="text" id="ref-title-${id}" />
      </label>
      <label>
        Email
        <input type="email" id="ref-email-${id}" />
      </label>
      <label>
        Phone
        <input type="tel" id="ref-phone-${id}" />
      </label>
    </div>`;
  wrapper.appendChild(div);
}

function collectValues(prefix) {
  const inputs = document.querySelectorAll(`[id^="${prefix}"]`);
  const grouped = {};
  inputs.forEach((el) => {
    const [, field, id] = el.id.match(/^[^\-]+\-([a-z]+)\-(\d+)$/) || [];
    if (!id) return;
    if (!grouped[id]) grouped[id] = {};
    grouped[id][field] = el.value;
  });
  return Object.values(grouped);
}

function generateCV() {
  const preview = document.getElementById('cv-preview');
  preview.innerHTML = '';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const summaryEn = document.getElementById('summary-en').value;
  const summarySo = document.getElementById('summary-so').value;

  const educations = collectValues('degree-en'); // will gather same id prefix but we restructure below
  const experiences = collectValues('job-en');
  // We'll process education and experience manually since collectValues was naive.

  // Education items
  const eduEls = document.querySelectorAll('.education-item');
  const eduData = Array.from(eduEls).map((item) => {
    return {
      degreeEn: item.querySelector('[id^="degree-en-"]').value,
      degreeSo: item.querySelector('[id^="degree-so-"]').value,
      institution: item.querySelector('[id^="institution-"]').value,
      period: item.querySelector('[id^="period-"]').value,
    };
  });

  // Experience items
  const expEls = document.querySelectorAll('.experience-item');
  const expData = Array.from(expEls).map((item) => {
    return {
      jobEn: item.querySelector('[id^="job-en-"]').value,
      jobSo: item.querySelector('[id^="job-so-"]').value,
      company: item.querySelector('[id^="company-"]').value,
      period: item.querySelector('[id^="exp-period-"]').value,
      descEn: item.querySelector('[id^="exp-desc-en-"]').value,
      descSo: item.querySelector('[id^="exp-desc-so-"]').value,
    };
  });

  // Languages
  const langEls = document.querySelectorAll('.language-item');
  const langData = Array.from(langEls).map((item) => {
    return {
      name: item.querySelector('[id^="lang-name-"]').value,
      level: item.querySelector('[id^="lang-level-"]').value,
    };
  });

  // References
  const refEls = document.querySelectorAll('.reference-item');
  const refData = Array.from(refEls).map((item) => {
    return {
      name: item.querySelector('[id^="ref-name-"]').value,
      title: item.querySelector('[id^="ref-title-"]').value,
      email: item.querySelector('[id^="ref-email-"]').value,
      phone: item.querySelector('[id^="ref-phone-"]').value,
    };
  });

  // Build HTML
  const section = (title) => `<h3 class="section-title">${title}</h3>`;
  let html = `
    <h2>${name}</h2>
    <p>${address} | ${phone} | ${email}</p>
    ${section('Professional Summary (English)')}
    <p>${summaryEn}</p>
    ${section('Professional Summary (Somali)')}
    <p>${summarySo}</p>
  `;

  if (eduData.length) {
    html += section('Education');
    eduData.forEach((e) => {
      html += `<p><strong>${e.degreeEn}</strong> / <em>${e.degreeSo}</em><br>${e.institution} | ${e.period}</p>`;
    });
  }

  if (expData.length) {
    html += section('Work Experience');
    expData.forEach((e) => {
      html += `<p><strong>${e.jobEn}</strong> / <em>${e.jobSo}</em><br>${e.company} | ${e.period}<br>${e.descEn}<br><em>${e.descSo}</em></p>`;
    });
  }

  // Skills
  const skills = document.getElementById('skills').value;
  if (skills) {
    html += section('Skills');
    html += `<p>${skills}</p>`;
  }

  // Languages
  if (langData.length) {
    html += section('Languages');
    html += '<ul>';
    langData.forEach((l) => {
      html += `<li>${l.name} - ${l.level}</li>`;
    });
    html += '</ul>';
  }

  // References
  if (refData.length) {
    html += section('References');
    refData.forEach((r) => {
      html += `<p><strong>${r.name}</strong> - ${r.title}<br>Email: ${r.email} | Phone: ${r.phone}</p>`;
    });
  }

  preview.innerHTML = html;
}

async function downloadPDF() {
  // Ensure preview is current
  if (!document.getElementById('cv-preview').innerHTML.trim()) {
    generateCV();
  }
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'pt', 'a4');

  const cv = document.getElementById('cv-preview');
  const canvas = await html2canvas(cv, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  // Calculate image ratio to fit A4
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

  // Add extra pages if image height exceeds page height
  let leftHeight = imgHeight;
  while (leftHeight > pageHeight) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    leftHeight -= pageHeight;
  }

  pdf.save('cv.pdf');
}