async function createCheckboxWithText(voice) {
  const voiceFromStorage = await chrome.storage?.sync.get('voice');
  const labelText = voice.voiceName;
  const lang = voice.lang;
  const checkbox = document.createElement('input');
  checkbox.type = 'radio';
  checkbox.checked = voiceFromStorage.voice.voiceName === voice.voiceName;
  checkbox.name = 'voice';
  checkbox.addEventListener('change', () => {
    handleclick(voice);
  });

  const span = document.createElement('span');
  span.textContent = `${labelText} ${lang}`;

  const div = document.createElement('div');
  div.appendChild(checkbox);
  div.appendChild(span);
  document.getElementById('checkbox-container').appendChild(div);
}

async function handleclick(voice) {
  await chrome.storage.sync.set({ voice });
}

async function createForm() {
  await chrome.tts?.getVoices((data) => {
    for (let x = 0; x < data.length; x++) {
      createCheckboxWithText(data[x]);
    }
  });
}

createForm();
