// Initialize color picker
document.addEventListener('DOMContentLoaded', function() {
  // Create the color picker instance
  const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'nano', // nano theme works best with the dark sci-fi design
    defaultRepresentation: 'HEXA',
    default: '#00f2ff', // Default color (neon blue from your theme)
    swatches: [
      '#00f2ff', // neon blue
      '#b700ff', // neon purple
      '#ff00e6', // neon pink
      '#00ffbb', // neon green
      '#ff006a', // neon red
      '#e6ff00', // neon yellow
      '#ff9900', // neon orange
      '#ffffff'  // white
    ],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: false,
        hsva: false,
        cmyk: false,
        input: true,
        clear: false,
        save: true
      }
    }
  });
  
  // Save the color to the hidden input when selected
  pickr.on('save', (color) => {
    document.getElementById('haarkleur').value = color.toHEXA().toString();
    pickr.hide();
  });
});

// Handle form submission
const form = document.querySelector("form");
const mess = document.querySelector(".message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  mess.classList.remove("success", "error");
  mess.innerHTML = "";
  
  // Make sure the color picker value is included
  if (!document.getElementById('haarkleur').value) {
    document.getElementById('haarkleur').value = '#00f2ff'; // Default value if none selected
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const response = await fetch("/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    mess.classList.add("success");
    mess.innerHTML = "<p>Je bericht is succesvol verzonden!</p>";
  } else {
    mess.classList.add("error");
    mess.innerHTML = `<p>Oeps, iet is kapoet! 💣💥</p>`;
  }
});
