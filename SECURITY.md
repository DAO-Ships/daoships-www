# Security Policy

This repository is the DAO Ships marketing and documentation site
([daoships.org](https://daoships.org)). It holds no user funds, requests no keys, and constructs
no transactions.

That does not make it low-risk. **The documentation is a security surface**: this site publishes
the contract addresses, RPC endpoints, and integration patterns that other people build against.
A wrong address here sends someone's launch to the wrong deployment. Incorrect guidance here gets
copied into code that moves real value on Quai mainnet.

## Reporting a vulnerability

Use **GitHub private vulnerability reporting**: the
[Security tab](https://github.com/DAO-Ships/daoships-www/security/advisories/new) on this
repository → *Report a vulnerability*.

For anything affecting the application, the contracts, or the indexer, report it on the
repository that owns it —
[daoships-app](https://github.com/DAO-Ships/daoships-app/security/advisories/new),
[daoships-contracts](https://github.com/DAO-Ships/daoships-contracts/security/advisories/new), or
[daoships-indexer](https://github.com/DAO-Ships/daoships-indexer/security/advisories/new).

## Scope

**In scope:** incorrect contract addresses, RPC endpoints, or chain IDs in the docs; code samples
that are exploitable or that silently produce a wrong result; XSS or injection in the site itself;
compromise of the build or hosting pipeline; anything that could redirect a reader to a
counterfeit application host.

**Treated as a security bug, not a typo:** a published address that does not match the deployment
the application actually uses. Both a stale address and a *coherent but different* deployment
qualify — the second is worse, because everything appears to work until the indexer has never
heard of the DAO you just launched.

**Out of scope:** prose errors, broken links, styling, and SEO.

## Threat model

### Counterfeit addresses and endpoints

The highest-value attack on a documentation site is a plausible wrong address. Readers copy from
docs, and a well-formed Cyprus-1 address is indistinguishable by eye from the correct one.

Two mitigations are documented rather than assumed. Addresses can be **derived on-chain** from a
single launcher rather than copied — a derived set is internally consistent by construction. And
RPC endpoints can be **verified before use**: `quai_chainId` returns `0x9` on mainnet and `0x3a98`
on Orchard. Both are described in
[Contracts & addresses](https://daoships.org/docs/developers/contracts).

### Guidance that fails silently

Some incorrect advice raises immediately and gets fixed. Some returns a plausible wrong answer and
ships. The latter is the more serious documentation defect, and
[Notes for AI agents](https://daoships.org/docs/developers/agents) exists specifically to catalogue
it. Corrections in that category are especially welcome.

### Machine readers

`llms.txt` and the docs tree are read by AI agents that may act on what they find without a human
in the loop. Content here should therefore be safe to follow literally. In particular, this site
never instructs a reader to paste a private key anywhere, to disable address or chain-ID
validation, or to route transactions through a third party.

### Impersonation

The only official hosts are `daoships.org`, `app.daoships.org`, and `testnet.daoships.org`. The
only official source is [github.com/DAO-Ships](https://github.com/DAO-Ships). Report anything
presenting itself as DAO Ships elsewhere — particularly anything that asks for a seed phrase or
private key, which no part of this project ever does.

## What this project never does

No private key is ever held, requested, or transmitted. No transaction is relayed or co-signed.
No server holds user funds or credentials.
