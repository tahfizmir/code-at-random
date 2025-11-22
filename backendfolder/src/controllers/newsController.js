const axios = require('axios');

exports.getNews = async (req, res) => {
  try {
    
    const topStoriesRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const top5Ids = topStoriesRes.data.slice(0, 5);

    
    const storyPromises = top5Ids.map(id => 
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );

    const storiesResponses = await Promise.all(storyPromises);
    
    const stories = storiesResponses.map(response => {
      const story = response.data;
      return {
        title: story.title,
        url: story.url,
        score: story.score,
        by: story.by,
        time: new Date(story.time * 1000).toLocaleDateString(),
        type: story.type
      };
    });

    res.json(stories);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
