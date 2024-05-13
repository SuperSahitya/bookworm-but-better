const bookL = [
  {
    name: "The Haunting Of Hill House",
    author: "Shirley Jackson",
    year: 1959,
    description:
      "The Haunting Of Hill House is the story of four seekers who arrive at a notoriously unfriendly pile called Hill House: Dr. Montague, an occult scholar looking for soof a 'haunting'.",
    price: 7,
    stock: 10,
    categories: ["Novel", "Fiction", "Horror"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 384 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/83e4cd1b-a1ed-446a-a49b-c1922d20c9aa-g1uco7.jpeg",
  },
  {
    name: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: 1880,
    description:
      "The Brothers Karamazov is a novel by Fyodor Dostoevsky that explores complex themes of spirituality, morality, and the nature of existence through the story of the Karamazov family.",
    price: 7.5,
    stock: 10,
    categories: ["Novel", "Fiction", "Philosophical"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 800 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/a9b90799-a853-4038-89fc-13cf0837600c-1tzdg6.jpeg",
  },
  {
    name: "P Prejudice",
    author: "Jane Austen",
    year: 1813,
    description:
      "P Prejudice follows the lives of the Bennett family and their romantic endeavors in 19th-century England.",
    price: 8.5,
    stock: 15,
    categories: ["Novel", "Romance"],
    details: [
      "Paperback",
      "Published by Vintage Books",
      "January 30, 2007 | 320 Pages | 5-1/5 x 8",
      "ISBN 9780307386864",
    ],
    imageUrl:
      "https://utfs.io/f/7ded6024-ffcd-42e7-a875-d8d8f965eb65-qrrgl6.jpeg",
  },
  {
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    description:
      "To Kill a Mockingbird is a novel set in the American South during the 1930s and deals with issues of racial injustice and moral growth.",
    price: 9.25,
    stock: 12,
    categories: ["Novel", "Fiction", "Legal Drama"],
    details: [
      "Paperback",
      "Published by Harper Perennial Modern Classics",
      "October 11, 2005 | 336 Pages | 5-1/4 x 8",
      "ISBN 9780061120084",
    ],
    imageUrl:
      "https://utfs.io/f/94411d19-ec48-4bb5-8920-ea0546098f6e-uughtk.jpeg",
  },
  {
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    description:
      "The Great Gatsby is a novel set in the Jazz Age and follows the lives of wealthy New Yorkers as they navigate love, wealth, and societal expectations.",
    price: 10.75,
    stock: 8,
    categories: ["Novel", "Fiction", "Classic"],
    details: [
      "Paperback",
      "Published by Scribner",
      "September 30, 2004 | 180 Pages | 5-1/2 x 8-1/2",
      "ISBN 9780743273565",
    ],
    imageUrl:
      "https://utfs.io/f/a52a978d-4490-4f27-9f0c-da81ec95d0d2-f1bm5w.jpeg",
  },
  {
    name: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
    description:
      "Moby-Dick is a novel about the voyage of the whaling ship Pequod, captained by the obsessed and monomaniacal Captain Ahab, who seeks revenge on the white whale Moby Dick.",
    price: 11,
    stock: 9,
    categories: ["Novel", "Adventure"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "March 28, 2003 | 624 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780142437247",
    ],
    imageUrl:
      "https://utfs.io/f/297e532a-a7cd-4f0c-aa36-36c59c9714a4-gxs1hd.jpeg",
  },
  {
    name: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    year: 1865,
    description:
      "Alice's Adventures in Wonderland is a fantasy novel about a young girl named Alice who falls through a rabbit hole into a bizarre world full of peculiar creatures and nonsensical situations.",
    price: 8,
    stock: 11,
    categories: ["Novel", "Fantasy"],
    details: [
      "Paperback",
      "Published by Puffin Books",
      "June 30, 1992 | 192 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439761",
    ],
    imageUrl:
      "https://utfs.io/f/21391a3e-6234-4c95-bcb7-714b08004ff5-6scgou.jpeg",
  },
  {
    name: "Wuthering Heights",
    author: "Emily Brontë",
    year: 1847,
    description:
      "Wuthering Heights is a novel that explores the passionate and destructive love between Catherine Earnshaw and Heathcliff, set against the backdrop of the Yorkshire moors.",
    price: 7.75,
    stock: 10,
    categories: ["Novel", "Gothic Fiction", "Romance"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "January 30, 2003 | 416 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439556",
    ],
    imageUrl:
      "https://utfs.io/f/8996184a-5ebb-4935-98ca-31c66c9aafc0-jcfyu6.jpeg",
  },
  {
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    description:
      "The Catcher in the Rye is a novel narrated by Holden Caulfield, a teenage boy who reflects on his experiences in New York City after being expelled from prep school.",
    price: 8.25,
    stock: 11,
    categories: ["Novel", "Fiction", "Coming-of-Age"],
    details: [
      "Paperback",
      "Published by Little, Brown and Company",
      "May 01, 1991 | 288 Pages | 5-1/4 x 8",
      "ISBN 9780316769174",
    ],
    imageUrl:
      "https://utfs.io/f/8102b301-369d-445b-b7db-d2bd2005ac33-wptamz.jpeg",
  },
  {
    name: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
    description:
      "The Picture of Dorian Gray is a novel about a young man, Dorian Gray, who sells his soul in exchange for eternal youth, leading to a life of decadence and moral corruption.",
    price: 7.5,
    stock: 10,
    categories: ["Novel", "Gothic Fiction", "Philosophical"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "June 05, 2003 | 304 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439570",
    ],
    imageUrl:
      "https://utfs.io/f/a269b5fe-f5f6-4d86-bcf2-83bc877d353c-bopdg6.jpeg",
  },
  {
    name: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    description:
      "Jane Eyre is a novel that follows the experiences of its eponymous character, from her abusive childhood to her blossoming love for Mr. Rochester.",
    price: 7.25,
    stock: 9,
    categories: ["Novel", "Gothic Fiction", "Romance"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "April 29, 2003 | 624 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439518",
    ],
    imageUrl:
      "https://utfs.io/f/3bc1e9df-93c7-41df-a476-71cb0c7ceede-bthixy.jpeg",
  },
  {
    name: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    description:
      "Frankenstein is a novel about Victor Frankenstein, a scientist who creates a grotesque creature in an unorthodox scientific experiment, leading to tragic consequences.",
    price: 7,
    stock: 10,
    categories: ["Novel", "Gothic Fiction", "Science Fiction"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "October 31, 2013 | 288 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439471",
    ],
    imageUrl:
      "https://utfs.io/f/c044d07d-174c-42c0-9ed9-552909d913de-m6jqfm.jpeg",
  },
  {
    name: "1984",
    author: "George Orwell",
    year: 1949,
    description:
      "Nineteen Eighty-Four, a dystopian novel by George Orwell that was published in 1949 is a cautionary tale about the consequences of allowing a government to have complete control.",
    price: 6.75,
    stock: 10,
    categories: ["Novel", "Fiction", "Science Fiction"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 284 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/1e96f809-a30b-4a93-8d40-570a3e28456e-wi04.jpeg",
  },
  {
    name: "Animal Farm",
    author: "George Orwell",
    year: 1945,
    description:
      "Animal Farm is a beast fable that tells the story of a group of anthropomorphic farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
    price: 6.8,
    stock: 9,
    categories: ["Novella", "Fiction", "Satire"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 193 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/949e0dc2-7513-4ea8-b5e8-415e0530913d-e8xeuf.jpeg",
  },
  {
    name: "Lord Of The Flies",
    author: "William Golding",
    year: 1954,
    description:
      "Lord of the Flies is the story of a group of British boys who are stranded on an uninhabited island and their disastrous attempts to govern themselves.",
    price: 7,
    stock: 10,
    categories: ["Novel", "Fiction"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 384 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/59e84fdd-9d38-41bc-9407-90b31287aba5-d44biv.jpeg",
  },
  {
    name: "Crime And Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    description:
      "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret.",
    price: 6.5,
    stock: 10,
    categories: ["Novel", "Fiction", "Crime Fiction"],
    details: [
      "Paperback",
      "Published by Penguin Random House",
      "May 06, 2003 | 384 Pages | 5-7/16 x 8",
      "ISBN 9780452284234",
    ],
    imageUrl:
      "https://utfs.io/f/ca254c3b-2b06-41b0-b92d-f1d297cf572d-55jcrg.jpeg",
  },
  {
    name: "The Hitchhiker's Gthe Galaxy",
    author: "Douglas Adams",
    year: 1979,
    description:
      "The Hitchhiker's Gthe Galaxy is a humorous science fiction series following the adventures of Arthur Dent after Earth's destruction.",
    price: 9,
    stock: 10,
    categories: ["Novel", "Science Fiction", "Humor"],
    details: [
      "Paperback",
      "Published by Del Rey Books",
      "September 27, 1995 | 224 Pages | 5-1/2 x 8-1/4",
      "ISBN 9780345391803",
    ],
    imageUrl:
      "https://utfs.io/f/e64ae264-2996-416e-af62-121dd5abf948-dwgwl0.jpeg",
  },
  {
    name: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    year: 1952,
    description:
      "The Old Man and the Sea is a short novel about an aging fisherman named Santiago who struggles with a giant marlin far out in the Gulf Stream off the coast of Cuba.",
    price: 7.5,
    stock: 10,
    categories: ["Novella", "Fiction"],
    details: [
      "Paperback",
      "Published by Scribner",
      "May 05, 1995 | 128 Pages | 5-1/2 x 8-1/4",
      "ISBN 9780684801223",
    ],
    imageUrl:
      "https://utfs.io/f/367623d3-0866-4202-bc4c-bb6b860245f8-a97x1k.jpeg",
  },
  {
    name: "The Sun Also Rises",
    author: "Ernest Hemingway",
    year: 1926,
    description:
      "The Sun Also Rises is a novel that portrays the lives of expatriates in post-World War I Europe, focusing on the experiences of a group of American and British expatriates in Paris and Spain.",
    price: 8,
    stock: 11,
    categories: ["Novel", "Fiction"],
    details: [
      "Paperback",
      "Published by Scribner",
      "September 02, 2014 | 256 Pages | 5-1/2 x 8-1/4",
      "ISBN 9781501121968",
    ],
    imageUrl:
      "https://utfs.io/f/b6cee091-2dab-4cfb-bdcf-9097ee31e621-r4rqnz.jpeg",
  },
  {
    name: "The Grapes of Wrath",
    author: "John Steinbeck",
    year: 1939,
    description:
      "The Grapes of Wrath is a novel set during the Great Depression and follows the Joad family as they migrate from Oklahoma to California in search of work, depicting the hardships faced by migrant workers.",
    price: 8.25,
    stock: 10,
    categories: ["Novel", "Fiction"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "March 28, 2006 | 544 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780143039433",
    ],
    imageUrl:
      "https://utfs.io/f/a4417212-4f11-483c-899f-21f8592680e8-wx3df.jpeg",
  },
  {
    name: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    year: 1967,
    description:
      "One Hundred Years of Solitude is a landmark novel that tells the multi-generational story of the Buendía family in the fictional town of Macondo, blending magical realism with historical events.",
    price: 9,
    stock: 9,
    categories: ["Novel", "Fiction"],
    details: [
      "Paperback",
      "Published by Harper Perennial Modern Classics",
      "February 21, 2006 | 417 Pages | 5-5/16 x 8",
      "ISBN 9780060883287",
    ],
    imageUrl:
      "https://utfs.io/f/6775c8b5-2e32-4501-974c-5ff38ec741e6-4i6mac.jpeg",
  },
  {
    name: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    year: 1892,
    description:
      "The Adventures of Sherlock Holmes is a collection of twelve short stories featuring Sherlock Holmes, a famous detective known for his logical reasoning and keen observation skills.",
    price: 8,
    stock: 10,
    categories: ["Short Stories", "Mystery"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "June 06, 2001 | 256 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780140439077",
    ],
    imageUrl:
      "https://utfs.io/f/bc78c893-1622-48c8-a754-9e5a9e0ee0cf-hwq1jm.jpeg",
  },
  {
    name: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    year: 1902,
    description:
      "The Hound of the Baskervilles is a detective novel where Sherlock Holmes and Dr. Watson investigate the mysterious death of Sir Charles Baskerville and the legend of a supernatural hound haunting the Baskerville family.",
    price: 7.5,
    stock: 9,
    categories: ["Novel", "Mystery"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "April 29, 2003 | 240 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439334",
    ],
    imageUrl:
      "https://utfs.io/f/cc397a67-d417-433d-aca7-d461f22e0e79-o9vwmm.jpeg",
  },
  {
    name: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    year: 1887,
    description:
      "A Study in Scarlet is the first novel to feature Sherlock Holmes and Dr. Watson. It follows their investigation into a murder in London and introduces readers to the iconic detective duo.",
    price: 7,
    stock: 10,
    categories: ["Novel", "Mystery"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "October 31, 2001 | 192 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780140439084",
    ],
    imageUrl:
      "https://utfs.io/f/7ece02da-3eac-4ca2-aac1-80670b3a9108-xwh5j2.jpeg",
  },
  {
    name: "The Sign of the Four",
    author: "Arthur Conan Doyle",
    year: 1890,
    description:
      "The Sign of the Four is a novel where Sherlock Holmes and Dr. Watson solve a complex case involving stolen treasure, secret pacts, and murder.",
    price: 7.25,
    stock: 8,
    categories: ["Novel", "Mystery"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "July 31, 2001 | 160 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780140439077",
    ],
    imageUrl:
      "https://utfs.io/f/16507b5c-65bf-4023-a5a9-b64dad3e5db7-o7t1xg.jpeg",
  },
  {
    name: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    description:
      "Dracula is a gothic horror novel about Count Dracula's attempt to move from Transylvania to England so he may find new blood and spread the undead curse.",
    price: 7.5,
    stock: 11,
    categories: ["Novel", "Gothic Fiction", "Horror"],
    details: [
      "Paperback",
      "Published by Penguin Classics",
      "December 31, 2002 | 512 Pages | 5-1/16 x 7-3/4",
      "ISBN 9780141439846",
    ],
    imageUrl:
      "https://utfs.io/f/d7ba214a-6651-40ab-a580-19ef231cc3a2-vmlwfu.jpeg",
  },
  {
    name: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
    description:
      "The Adventures of Huckleberry Finn follows the escapades of a young boy and a runaway slave as they travel down the Mississippi River on a raft, facing various challenges and learning about life along the way.",
    price: 7.25,
    stock: 9,
    categories: ["Novel", "Adventure", "Satire"],
    details: [
      "Paperback",
      "Published by Dover Publications",
      "April 19, 1994 | 224 Pages | 5-3/16 x 8-1/4",
      "ISBN 9780486280615",
    ],
    imageUrl:
      "https://utfs.io/f/d3294bd7-15ba-4a9c-bf4b-bf7c097f44c2-phwzf4.jpeg",
  },
];

