// This file simulates the data you'll fetch from your Supabase database.
// The structure is designed to be identical to your future table.

export type Post = {
    id: string;
    platform: 'instagram' | 'facebook';
    caption: string;
    media_key: string; // This will be the object key from Cloudflare R2
    likes: number;
    comments: number;
    timestamp: string;
};

export const mockPosts: Post[] = [
    {
        id: '1',
        platform: 'instagram',
        caption: 'Pushing limits and breaking barriers in the Strength Matrix today! #FitnessPlus #Strength',
        media_key: 'strength-post-01.jpg', // Example object key
        likes: 1254,
        comments: 45,
        timestamp: '2025-09-06T10:00:00Z',
    },
    {
        id: '2',
        platform: 'facebook',
        caption: 'That feeling after a killer cardio session on the new treadmills. Who else loves the burn?',
        media_key: 'cardio-post-01.jpg',
        likes: 832,
        comments: 22,
        timestamp: '2025-09-05T18:30:00Z',
    },
    {
        id: '3',
        platform: 'instagram',
        caption: 'Finding my flow in the yoga studio. Perfect way to end the week. 🙏 #MindAndBody',
        media_key: 'yoga-post-01.jpg',
        likes: 2109,
        comments: 88,
        timestamp: '2025-09-05T12:00:00Z',
    },
    {
        id: '4',
        platform: 'facebook',
        caption: 'Our functional training zone is no joke! Feeling stronger and more agile every day.',
        media_key: 'functional-post-01.jpg',
        likes: 641,
        comments: 15,
        timestamp: '2025-09-04T09:00:00Z',
    },
    {
        id: '5',
        platform: 'instagram',
        caption: 'Fueling up with the new post-workout shakes from the nutrition bar. Game changer!',
        media_key: 'supplements-post-01.jpg',
        likes: 1530,
        comments: 67,
        timestamp: '2025-09-03T15:45:00Z',
    },
    {
        id: '6',
        platform: 'instagram',
        caption: 'Another great session with the best community. The energy here is unmatched!',
        media_key: 'community-post-01.jpg',
        likes: 1890,
        comments: 72,
        timestamp: '2025-09-02T20:00:00Z',
    },
    // Add more mock posts as needed to test the infinite scroll
];
