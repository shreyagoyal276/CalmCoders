document.addEventListener('DOMContentLoaded', () => {
  const emotionSegments = document.querySelectorAll('.emotionSegment');
  const selectedEmotionInput = document.getElementById('selectedEmotionInput');
  const detectedEmotionSpan = document.getElementById('detectedEmotion');

  // Highlight emotion if detected by backend
  const backendDetectedEmotion = detectedEmotionSpan.textContent.trim();
  if (backendDetectedEmotion && backendDetectedEmotion !== 'None') {
    emotionSegments.forEach(s => {
      if (s.getAttribute('data-emotion') === backendDetectedEmotion) {
        s.classList.add('selected');
        selectedEmotionInput.value = backendDetectedEmotion;
      }
    });
  }

    

  // When user clicks an emotion, update selection
  emotionSegments.forEach(segment => {
    segment.addEventListener('click', () => {
      emotionSegments.forEach(s => s.classList.remove('selected'));
      segment.classList.add('selected');
      const selectedEmotion = segment.getAttribute('data-emotion');
      selectedEmotionInput.value = selectedEmotion;
      detectedEmotionSpan.textContent = selectedEmotion;
    });
  });
});

