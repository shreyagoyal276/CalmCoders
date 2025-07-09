document.addEventListener('DOMContentLoaded', () => {
    const emotionWheel = document.getElementById('emotionWheel');
    const emotionSegments = document.querySelectorAll('.emotionSegment');
    const userInput = document.getElementById('userInput');
    const detectedEmotionSpan = document.getElementById('detectedEmotion');
    const selectedEmotionInput = document.getElementById('selectedEmotionInput');
  
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
  