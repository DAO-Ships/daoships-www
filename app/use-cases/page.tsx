import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { UseCaseSelector } from "@/components/landing/UseCaseSelector";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Five battle-tested DAO templates — startup team, community DAO, protocol DAO, investment DAO, and agent DAO — each pre-tuned for its scale and trust model.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use cases"
        title={
          <>
            One framework. <span className="text-gradient">Five ways to sail.</span>
          </>
        }
        intro="Governance isn't one-size-fits-all. Each template pre-tunes voting periods, quorum, retention, and onboarding for a specific kind of organization — then you customize from there."
      />
      <section className="section py-16">
        <Reveal>
          <UseCaseSelector />
        </Reveal>
      </section>
    </>
  );
}
