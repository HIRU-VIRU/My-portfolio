# Problem Statement 04

## Problem Title

Absence of Affordable, Objective Quality Grading for Perishable Seafood and Produce in Local Markets and Export Supply Chains

## Sector / Domain

**Primary:** Fisheries
**Secondary:** AI & ML

## Problem Summary / Elevator Pitch

Quality grading of perishable seafood and produce in India's local markets and export supply chains relies almost entirely on subjective human judgment. This leads to inconsistent grading, disputes between vendors and buyers, undetected spoilage entering the supply chain, and rejected export shipments. Small-scale fish vendors, aggregators, and exporters simply do not have access to affordable, objective freshness verification tools that can provide evidence-based quality assessments at the point of transaction.

## Background & Context

Tamil Nadu has a coastline of approximately 1,076 km and a significant fisheries sector spanning marine and inland fish production. The state's fishing harbours, fish landing centres, and local fish markets handle large volumes of perishable seafood daily. Beyond local consumption, Tamil Nadu contributes to India's seafood export industry, which must comply with stringent quality and safety standards set by importing countries and agencies like MPEDA (Marine Products Export Development Authority).

Quality assessment of fish and seafood at various stages (landing, auction, wholesale distribution, and retail) is done visually by experienced handlers who judge freshness based on eye clarity, skin condition, gill colour, and texture. This assessment is inherently subjective, varies between individuals, and produces no documented evidence of quality at the time of transaction. For export consignments, manual inspection must determine whether individual fish meet export-grade freshness standards. If spoilage markers in a batch are missed, it can lead to rejection of entire shipments at the destination, causing significant financial losses.

A similar problem exists for fruits and vegetables in local markets, where spoilage detection at the point of sale is entirely manual and inconsistent.

## Problem Definition

The core problem is the absence of affordable, objective, and documented quality grading mechanisms for perishable goods at the point of transaction in local markets and export supply chains. Current grading is entirely manual, produces no auditable quality record, and is vulnerable to inconsistency, fatigue, and disputes.

This persists because:
- Automated quality grading systems used in large food processing plants are expensive and designed for industrial conveyor environments, not for market or landing centre conditions.
- Fish quality assessment requires detecting biological freshness and spoilage markers (eye condition, skin condition) that vary by species, which makes simple rule-based systems inadequate.
- Small-scale vendors, auctioneers, and aggregators work in environments without stable power, controlled lighting, or IT infrastructure.
- For exports, the cost of missed spoilage detection in a batch falls on the exporter. No affordable pre-shipment batch verification tool exists that can deliver evidence-based verdicts.

The consequences include financial losses from export rejections, consumer safety concerns from undetected spoilage in local markets, and an inability to build trust-based supply chains between producers, aggregators, and buyers.

## Key Challenges / Pain Points

- **Subjectivity of manual grading:** Two inspectors may grade the same fish differently because no objective standard is applied consistently.
- **Species variation:** Freshness and spoilage markers look different across fish species, so detection systems need to generalise or adapt across species boundaries.
- **Environmental constraints:** Markets and landing centres have variable lighting, wet conditions, and no clean-room environments for equipment.
- **Batch assessment for exports:** Export compliance requires assessing multiple fish in a batch and making a decision on the whole batch (for example, reject if spoilage exceeds a threshold), not just grading individual fish.
- **No documentation:** Manual grading produces no timestamped, evidence-backed quality record that can be shared with buyers or retained for compliance purposes.
- **Cost sensitivity:** Small-scale fish vendors and aggregators cannot invest in expensive grading equipment. Any solution needs to run on commodity devices like smartphones or basic laptops.

## Stakeholders Affected

- Small-scale fish vendors and market auctioneers
- Seafood export companies and aggregators
- Fish landing centre operators and harbour authorities
- MPEDA and export compliance inspectors
- Fruit and vegetable vendors in local markets
- Consumers purchasing perishable goods from local markets
- Cold chain and logistics operators handling perishable goods

## Justification / Need for Solution

India's seafood export industry is a significant foreign exchange earner, and quality rejections at the destination directly hit this revenue. At the local market level, consumer awareness about food quality is growing, and the demand for verified freshness is rising alongside the expansion of online grocery platforms that source from local markets.

The technology for visual freshness and spoilage detection using computer vision (object detection models trained on freshness and spoilage markers) has been shown to work on mobile and edge hardware. The missing piece is making this capability accessible and affordable for the small-scale operators who need it most, at the market, landing centre, and pre-export inspection stages.

Objective, documented quality grading at the point of transaction would reduce disputes, build trust in supply chain relationships, lower export rejection rates, and improve consumer safety, all without requiring expensive industrial infrastructure.

## Existing Solutions & Gaps

**MPEDA export inspection procedures:** Manual visual and sensory inspection by trained inspectors at processing plants. This happens at the processing plant stage, not at the upstream stages (landing, auction, aggregation) where catching problems early could prevent defective fish from even entering the export pipeline.

**Industrial grading machines (NIR spectroscopy, hyperspectral imaging):** Highly accurate but built for factory environments. Their cost, size, and infrastructure requirements make them unsuitable for markets and landing centres.

**Manual sensory evaluation charts (EU freshness grading schemes):** Provide standardised grading criteria, but still depend on human judgment for application. No automated verification or documentation is produced.

The specific gap: no affordable, camera-based quality grading tool exists that can detect freshness and spoilage markers across species, provide batch-level compliance verdicts for export shipments, and generate documented quality reports, all running on edge devices in uncontrolled market environments.

## Type of Innovation

- Product
- Technology

## SDG Alignment

- **SDG 2, Zero Hunger:** Reducing spoilage in the supply chain and improving quality detection at point of sale cuts food waste and improves food safety.
- **SDG 8, Decent Work and Economic Growth:** Fewer export rejections protect the livelihoods of fishing communities and improve export earnings.
- **SDG 14, Life Below Water:** Better quality management of marine products supports sustainable use of ocean resources by reducing waste.

## Target Beneficiaries

Small-scale fish vendors, seafood export aggregators and companies, fish landing centre operators, MPEDA compliance staff, local market produce vendors, and consumers purchasing perishable goods in Tamil Nadu's coastal districts and urban markets.

## Source of Problem

This problem was identified through the development of an edge-to-cloud AI pipeline for seafood quality assessment that uses dual YOLO vision models for export compliance checking and local vendor grading. The project trained a model on eight classes covering species identification and freshness/spoilage markers (Fresh-Eye, Fresh-Skin, VeryFresh-Eye, VeryFresh-Skin, NonFresh-Eye, NonFresh-Skin), implemented batch-level compliance verdicts with configurable spoilage thresholds, and generated formal compliance reports through LLM integration. The technical work, particularly the challenges of running inference on constrained edge hardware (2 GB VRAM GPU) with VRAM-aware model swapping, directly shaped the understanding of what is technically feasible for affordable, field-deployable quality grading.

## Geographic Relevance

State, Tamil Nadu

## Expected Outcome

- Objective, consistent quality grading replacing subjective manual assessment at markets and landing centres
- Lower export shipment rejection rates through pre-shipment batch verification
- Timestamped, evidence-backed quality documentation for every transaction
- Fewer food safety incidents from undetected spoilage entering the local supply chain
- Deployment on smartphones or low-cost edge devices without needing industrial infrastructure
