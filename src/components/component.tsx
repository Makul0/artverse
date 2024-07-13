"use client"

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

interface NFT {
  id: number;
  image: string;
  title: string;
  artist: string;
  price: number;
  category: string;
  description: string;
}

interface Filters {
  category: string[];
  price: {
    min: number;
    max: number;
  };
}

export function Component() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    price: {
      min: 0,
      max: 1000,
    },
  });

  const nfts: NFT[] = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Starry Night",
      artist: "Vincent van Gogh",
      price: 0.5,
      category: "Impressionism",
      description: "A classic painting depicting the night sky over a small town, with a swirling, expressive style.",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "The Scream",
      artist: "Edvard Munch",
      price: 0.75,
      category: "Expressionism",
      description: "A haunting and iconic work, capturing a figure in a state of anguish against a swirling, colorful background.",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "The Kiss",
      artist: "Gustav Klimt",
      price: 0.6,
      category: "Art Nouveau",
      description: "A stunning, gold-leafed painting depicting two lovers in an embrace, surrounded by intricate patterns and designs.",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      price: 0.8,
      category: "Surrealism",
      description: "A surreal and dreamlike painting, featuring melting clocks and a desolate landscape, exploring the nature of time and perception.",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "American Gothic",
      artist: "Grant Wood",
      price: 0.4,
      category: "Regionalism",
      description: "An iconic painting depicting a stern-faced farmer and his wife standing in front of a white wooden house, capturing the essence of rural American life.",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "The Birth of Venus",
      artist: "Sandro Botticelli",
      price: 0.9,
      category: "Renaissance",
      description: "A beautiful and mythological painting, showing the goddess Venus emerging from the sea on a giant scallop shell, surrounded by other figures and symbols.",
    },
  ];

  const filteredNfts = useMemo(() => {
    return nfts
      .filter((nft) => {
        if (searchTerm && !nft.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        if (filters.category.length > 0 && !filters.category.includes(nft.category)) {
          return false;
        }
        if (nft.price < filters.price.min || nft.price > filters.price.max) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.id - a.id;
          case "cheapest":
            return a.price - b.price;
          case "most-expensive":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [searchTerm, filters, sortBy]);

  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <PaletteIcon />
            <Link href="#" className="font-bold text-lg" prefetch={false}>
              Artverse
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Explore
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Create
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              My NFTs
            </Link>
          </nav>
          <div className="relative flex-1 max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-muted w-full"
            />
          </div>
          <Button variant="outline" className="ml-4">
            Connect Wallet
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon className="w-5 h-5" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Impressionism", "Expressionism", "Art Nouveau", "Surrealism", "Regionalism", "Renaissance"].map(
                  (category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.category.includes(category)}
                      onCheckedChange={(checked) => {
                        setFilters((prev) => ({
                          ...prev,
                          category: checked
                            ? [...prev.category, category]
                            : prev.category.filter((c) => c !== category),
                        }));
                      }}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListOrderedIcon className="w-5 h-5" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="cheapest">Cheapest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="most-expensive">Most Expensive</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button variant="outline">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create NFT
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedNft(nft)}
            >
              <img
                src={nft.image}
                alt={nft.title}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{nft.title}</h3>
                <p className="text-muted-foreground">{nft.artist}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-bold">{nft.price} SOL</div>
                  <Button variant="outline" size="sm">
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {selectedNft && (
        <div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          onClick={() => setSelectedNft(null)}
        >
          <div
            className="bg-background border rounded-lg p-8 max-w-lg mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedNft(null)}
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <img
              src={selectedNft.image}
              alt={selectedNft.title}
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedNft.title}</h2>
            <p className="text-muted-foreground mb-4">{selectedNft.artist}</p>
            <div className="text-primary font-bold mb-4">{selectedNft.price} SOL</div>
            <p className="text-muted-foreground">{selectedNft.description}</p>
            <Button variant="outline" size="lg" className="mt-6 w-full">
              Buy for {selectedNft.price} SOL
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}



const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.25a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v.438a.75.75 0 01-.225.53l-5.252 5.252v7.03a.75.75 0 01-.364.643l-3 1.714A.75.75 0 0110 19.914v-7.03L4.748 6.218a.75.75 0 01-.225-.53V5.25z"
      clipRule="evenodd"
    />
  </svg>
);
const ListOrderedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M8.25 6.75h13.5a.75.75 0 000-1.5H8.25a.75.75 0 000 1.5zM8.25 13.5h13.5a.75.75 0 000-1.5H8.25a.75.75 0 000 1.5zM8.25 20.25h13.5a.75.75 0 000-1.5H8.25a.75.75 0 000 1.5zM5.178 5.74a.75.75 0 01-.478.843V7.5a.75.75 0 01-1.5 0V6.6a.75.75 0 01.75-.75h.772c-.053-.06-.108-.123-.164-.188l-.097-.112a2.398 2.398 0 01-.131-.174c-.048-.072-.089-.146-.123-.222a.75.75 0 111.382-.608c.025.057.054.113.086.167.027.048.057.094.088.139.05.075.105.146.165.215.057.064.12.127.186.19l.094.085A.75.75 0 115.178 5.74zM3.75 10.5a.75.75 0 01.75.75v1.04c.214-.214.444-.41.686-.586a.75.75 0 01.88 1.225 4.337 4.337 0 00-.416.357c-.173.168-.326.336-.448.507-.12.166-.202.332-.252.485h1.8a.75.75 0 110 1.5H3.75a.75.75 0 01-.75-.75c0-.288.06-.637.207-1.006.144-.364.36-.737.649-1.088.102-.123.214-.244.33-.362a6.19 6.19 0 00-.86.74.75.75 0 01-.642.328.75.75 0 010-1.5h.27a6.987 6.987 0 01.45-.617zm.005 8.25h.482a.75.75 0 000-1.5H3.75a.75.75 0 000 1.5zM5.4 20.25a.75.75 0 010-1.5H3.75a.75.75 0 000 1.5zM6.75 19.5a.75.75 0 000 1.5H3.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5H4.73c.246-.246.533-.512.773-.792.072-.083.142-.167.21-.253a.75.75 0 00-.963-1.11c-.1.123-.2.249-.298.377a10.24 10.24 0 01-.29.367z" />
  </svg>
);
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 4.75a.75.75 0 01.75.75v5.75h5.75a.75.75 0 010 1.5h-5.75v5.75a.75.75 0 01-1.5 0v-5.75H4.75a.75.75 0 010-1.5h5.75V5.5a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.47 4.47a.75.75 0 011.06 0L12 10.94l6.47-6.47a.75.75 0 111.06 1.06L13.06 12l6.47 6.47a.75.75 0 11-1.06 1.06L12 13.06l-6.47 6.47a.75.75 0 01-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
function PaletteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}
