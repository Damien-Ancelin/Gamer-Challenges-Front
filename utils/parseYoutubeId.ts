export const parseYoutubeId = (videoLink: string | null): string | null => {
  if (!videoLink) {
    return null;
  }
  // Check if the video link is a valid YouTube URL
  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}$/;
  if (!youtubeUrlPattern.test(videoLink)) {
    return null;
  }

  // Extract the video ID from the URL
  const videoIdMatch = videoLink.match(/(?:v=|youtu\.be\/)([\w\-]{11})/);
  if (!videoIdMatch || videoIdMatch.length < 2) {
    return null;
  }
  const videoId = videoIdMatch[1];
  return videoId;
};
