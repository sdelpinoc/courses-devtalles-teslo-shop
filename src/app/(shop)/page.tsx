
import { CardGrid } from "@/components/cards/card-grid/CardGrid";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed-yugioh";

const cards = initialData.cards

export default function Home () {
  return (
    <>
      <Title
        title="Store"
        subtitle="All the cards"
        className="mb-2"
      />
      <CardGrid
        cards={cards}
      />
    </>
  );
}
