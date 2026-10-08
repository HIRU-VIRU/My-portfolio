# Problem Statement 01

## Problem Title

Undetected Fabric Defects in Powerloom and Handloom Production Due to Reliance on Manual Visual Inspection

## Sector / Domain

**Primary:** Manufacturing
**Secondary:** AI & ML

## Problem Summary / Elevator Pitch

Fabric defects like holes, knots, stains, and line faults slip through in powerloom and handloom production units because quality inspection depends entirely on human eyes under time pressure. This leads to high rejection rates at the buyer end, weakened export competitiveness, and direct financial losses for small and micro textile producers who simply cannot afford automated inspection systems.

## Background & Context

Tamil Nadu accounts for a significant share of India's textile output, with major clusters in Erode, Tirupur, Coimbatore, Salem, and Karur producing powerloom fabrics, knitwear, and handloom products. The textile and apparel sector is one of the state's largest employers, particularly for women and semi-skilled workers in rural and semi-urban areas.

Quality inspection in these production units is almost universally done by trained human inspectors who visually scan moving fabric on inspection frames or tables. A single inspector may need to examine hundreds of metres of fabric per shift. Fatigue, inconsistent lighting, and high production speed all create conditions where defects are routinely missed. The problem is most severe in small and micro enterprises, which make up the majority of the sector, because hiring multiple inspectors or investing in expensive industrial vision systems is simply not viable for them.

As global buyers and e-commerce platforms increasingly enforce strict quality standards with penalty clauses for defective shipments, the gap between what manual inspection catches and what buyers expect is becoming a serious business risk for these producers.

## Problem Definition

At its core, manual visual inspection of fabric is unreliable at the speeds and volumes typical of Indian textile units. Human inspectors experience cognitive fatigue during long shifts, and their defect detection rates drop as a result. Common defect types like holes, knots, line faults, and stains vary in size, contrast, and location, making it extremely difficult for any single person to maintain consistent attention across all defect categories at once.

This problem persists because:
- Automated machine vision systems built for large textile plants are far too expensive for small and micro enterprises.
- Existing solutions need specialised camera hardware, controlled lighting setups, and dedicated IT infrastructure that small units simply cannot support.
- There is no widely available, low-cost defect detection tool that works on commodity hardware (a standard laptop or phone with a camera) and still achieves acceptable accuracy.
- The types of defects vary across fabric categories (woven, knit, handloom), and most commercial systems are not easily adaptable to different production contexts.

The result is a vicious cycle: high defect pass-through leads to buyer rejections, penalty deductions, and lost orders, which in turn erodes the producer's ability to invest in quality infrastructure.

## Key Challenges / Pain Points

- **Inconsistency of manual inspection:** Detection rates vary widely between inspectors and across shifts. Fatigue-related miss rates climb significantly during extended production runs.
- **Cost of industrial vision systems:** Automated inspection systems from international vendors carry hardware and software costs that are out of reach for micro and small enterprises.
- **Infrastructure constraints:** Many small production units lack stable power, air-conditioned environments, and IT support staff needed for industrial automation.
- **Defect diversity:** Fabric defects span multiple visual categories (structural, surface, contamination), and a single detection model needs to handle all of them reliably.
- **Speed requirements:** Inspection must keep pace with the production line. Any solution that significantly slows production is a non-starter.
- **No digital records:** Manual inspection produces no auditable record of defect rates, locations, or trends, making it impossible to trace root causes in the production process.

## Stakeholders Affected

- Small and micro-scale powerloom and handloom fabric producers
- Textile quality inspectors and production supervisors
- Textile exporters and export houses dependent on quality compliance
- Garment manufacturers receiving defective input fabric
- Handloom weavers producing high-value products where defects cause disproportionate losses
- Industry bodies and textile clusters working on competitiveness improvement

## Justification / Need for Solution

India's textile sector faces increasing competitive pressure from countries with more automated production processes. Tamil Nadu's position as a leading textile state depends on maintaining quality standards that satisfy both domestic organised retail and international buyers.

The shift toward e-commerce and direct-to-consumer models has reduced tolerance for defective products. Return rates and negative reviews directly impact seller viability. At the same time, finding enough skilled human inspectors is becoming harder as workforce demographics shift.

Affordable, accessible defect detection that runs on existing hardware (cameras and computers already present in many units) would let small producers approach the quality assurance standards currently achievable only by large, automated factories. This would improve export eligibility, cut post-production rejection losses, and generate digital quality data that can be fed back into the production process for continuous improvement.

## Existing Solutions & Gaps

**Industrial machine vision systems (Uster, Mahlo, etc.):** These are highly accurate but built for large-scale plants. The cost of hardware, installation, and maintenance puts them out of reach for the micro and small enterprise segment that makes up most of Indian textile production.

**Generic image classification tools:** Available as cloud APIs but not tailored to fabric defect categories. They need extensive customisation, do not provide defect localisation (bounding boxes), and introduce latency and data privacy concerns through cloud processing.

**Manual inspection with basic grading frameworks:** This is the current standard in most small units. It produces no digital record, depends entirely on individual inspector skill, and cannot maintain consistency across shifts and batches.

The specific gap that remains is the absence of a lightweight, defect-localising detection tool that can classify multiple fabric defect types, run on CPU or basic GPU hardware, and produce structured inspection reports, all at a cost point accessible to micro and small textile producers.

## Type of Innovation

- Product
- Technology

## SDG Alignment

- **SDG 8, Decent Work and Economic Growth:** Improving quality detection protects the competitiveness of small textile producers and the livelihoods of workers who depend on this sector.
- **SDG 9, Industry, Innovation and Infrastructure:** Bringing AI-powered inspection to small-scale manufacturing units addresses the industrial technology gap between large and small enterprises.
- **SDG 12, Responsible Consumption and Production:** Reducing defect pass-through cuts fabric waste and the resources consumed in producing and transporting defective goods.

## Target Beneficiaries

Small and micro-scale powerloom operators, handloom production units, textile quality supervisors, fabric exporters, and garment manufacturers in Tamil Nadu's textile clusters (Erode, Tirupur, Coimbatore, Salem, Karur).

## Source of Problem

This problem was identified through the development of a computer vision project that trained a custom YOLOv8 model for fabric defect detection across four defect classes (Hole, Knot, Line, Stain). During project development, the challenges of building a lightweight, CPU-optimized ONNX inference pipeline capable of batch processing and producing per-defect bounding box coordinates were directly encountered. The technical work showed that affordable, real-time defect detection on commodity hardware is feasible, while also highlighting the gap between this capability and its availability to small-scale producers.

## Geographic Relevance

State, Tamil Nadu

## Expected Outcome

- More consistent defect detection compared to manual inspection alone
- Lower buyer rejection rates and fewer financial penalties for small textile producers
- Structured, digital inspection reports (timestamp, defect class, confidence, location) that enable process improvement
- Faster inspection cycles through batch image processing
- Deployment on existing hardware without needing specialised industrial equipment
