export interface Movie {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  year: number;
  duration: string;
  rating: number;
  genres: string[];
  languages: string[];
  quality: string;
  pgRating: string;
  label?: string; // Upcoming er jonno extra fields
  subtitle?: string;
  releaseDate?: string;
}

export const FEATURED_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Black Panther: Wakanda Forever",
    slug: "black-panther-wakanda-forever",
    description:
      "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
    image: "/assets/images/blcak-panther.jpg",
    year: 2022,
    duration: "2h 41m",
    rating: 6.7,
    genres: ["Action", "Adventure", "Drama"],
    languages: ["English", "Spanish"],
    quality: "HD / 4K",
    pgRating: "PG-13",
  },
  {
    id: 2,
    title: "Morbius",
    slug: "morbius",
    description:
      "Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism.",
    image: "/assets/images/morbius.png",
    year: 2022,
    duration: "1h 44m",
    rating: 5.2,
    genres: ["Action", "Adventure", "Horror"],
    languages: ["English"],
    quality: "HD",
    pgRating: "PG-13",
  },
  {
    id: 3,
    title: "Doctor Strange",
    slug: "doctor-strange",
    description:
      "In an accident, Stephen Strange, a famous neurosurgeon, loses the ability to use his hands. He goes to visit the mysterious Ancient One.",
    image: "/assets/images/doctor-strange.jpg",
    year: 2016,
    duration: "1h 55m",
    rating: 7.5,
    genres: ["Action", "Adventure", "Fantasy"],
    languages: ["English", "Hindi"],
    quality: "HD / 4K",
    pgRating: "PG-13",
  },
  {
    id: 4,
    title: "Jumanji: The Next Level",
    slug: "jumanji-the-next-level",
    description:
      "The gang is back but the game has changed. As they return to rescue one of their own, they discover that nothing is as they expect.",
    image: "/assets/images/jumanji.jpg",
    year: 2019,
    duration: "2h 3m",
    rating: 6.7,
    genres: ["Action", "Adventure", "Comedy"],
    languages: ["English", "Spanish"],
    quality: "HD",
    pgRating: "PG-13",
  },
  {
    id: 5,
    title: "The Mother",
    slug: "the-mother",
    description:
      "An assassin comes out of hiding to protect the daughter she gave up years before, while on the run from dangerous men.",
    image: "/assets/images/mother.png",
    year: 2023,
    duration: "1h 55m",
    rating: 5.6,
    genres: ["Action", "Thriller"],
    languages: ["English"],
    quality: "HD",
    pgRating: "R",
  },
];

export const UPCOMING_MOVIES: Movie[] = [
  {
    id: 1,
    title: "AVENGERS: DOOMSDAY",
    slug: "avengers-doomsday",
    label: "Marvel Studios",
    subtitle: "The Multiverse Collapses",
    description:
      "A new era of the MCU begins as Doctor Doom rises to reshape reality. The remaining heroes must unite for the ultimate stand against the void.",
    image: "/assets/images/movie-baner!.jpg",
    releaseDate: "01/05/2026",
    year: 2026,
    duration: "2h 45m",
    rating: 0.0,
    genres: ["Action", "Sci-Fi", "Adventure"],
    languages: ["English"],
    quality: "IMAX / 4K",
    pgRating: "PG-13",
  },
  {
    id: 2,
    title: "THE BATMAN PART II",
    slug: "the-batman-part-ii",
    label: "DC Studios",
    subtitle: "Deep in the Shadows",
    description:
      "Robert Pattinson returns as the Dark Knight. As Gotham faces a chilling new threat, Bruce Wayne must decide what he's willing to sacrifice for justice.",
    image: "/assets/images/movie-baner2.jpg",
    releaseDate: "02/10/2026",
    year: 2026,
    duration: "2h 50m",
    rating: 0.0,
    genres: ["Action", "Crime", "Drama"],
    languages: ["English"],
    quality: "HD / 4K",
    pgRating: "R",
  },
  {
    id: 3,
    title: "DUNE: THE PROPHET",
    slug: "dune-the-prophet",
    label: "Warner Bros",
    subtitle: "The Desert War",
    description:
      "Paul Atreides continues his journey as the leader of the Fremen, navigating political intrigue and mystical visions on the sands of Arrakis.",
    image: "/assets/images/movie-baner-3.jpg",
    releaseDate: "18/12/2026",
    year: 2026,
    duration: "2h 35m",
    rating: 0.0,
    genres: ["Adventure", "Sci-Fi", "Drama"],
    languages: ["English"],
    quality: "HD / 4K",
    pgRating: "PG-13",
  },
];
