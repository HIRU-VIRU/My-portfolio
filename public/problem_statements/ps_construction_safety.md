# Problem Statement 06

## Problem Title

Persistent Safety Violations on Construction Sites Due to Lack of Continuous, Affordable PPE Compliance Monitoring

## Sector / Domain

**Primary:** Construction
**Secondary:** AI & ML

## Problem Summary / Elevator Pitch

Construction sites in India see a high rate of workplace injuries and fatalities, and a significant chunk of these are tied to workers not wearing Personal Protective Equipment (PPE) like helmets, safety vests, boots, gloves, and goggles. Right now, safety enforcement depends on periodic manual inspections and spot checks, which cover only a fraction of actual work hours and cannot catch PPE violations as they happen. Construction firms, especially smaller contractors, have no affordable way to continuously monitor PPE compliance across active work zones in real time.

## Background & Context

Construction is one of India's largest employment sectors and also one of the most hazardous. Workplace accidents on construction sites (falls, struck-by incidents, electrocution, and caught-between hazards) are a persistent problem. PPE non-compliance is a contributing factor in a substantial portion of these incidents. Workers may remove helmets because of heat, skip safety vests during short tasks, or neglect hand and eye protection when no supervisor is watching.

Tamil Nadu, with its active construction sector spanning residential, commercial, infrastructure, and industrial projects, faces this challenge at every project scale. Large infrastructure projects may have established safety departments, but smaller residential and commercial sites often have minimal or no safety oversight at all.

Current PPE enforcement follows a supervisory model: safety officers walk the site periodically, spot-check workers, and issue warnings or penalties for violations. This model has obvious limitations. A safety officer can only be in one place at a time, inspections are episodic rather than continuous, and workers quickly learn the inspection patterns and comply only when they expect a check. Some larger firms have CCTV for security purposes, but these cameras are passively monitored (if at all) and not connected to any automated safety analysis.

## Problem Definition

The core problem is that PPE compliance on construction sites cannot be continuously monitored under the current supervisory model. This creates temporal and spatial gaps in enforcement during which violations go unchecked. Because manual inspections are intermittent, the actual PPE compliance rate during unsupervised periods is unknown and almost certainly far lower than what is observed during inspections.

This persists because:
- Having a human supervisor continuously watching every work zone is economically infeasible, especially on sites with multiple active areas.
- Existing CCTV infrastructure is used for security and access control, not safety analysis. The feeds are passively recorded, not actively analysed.
- Commercial safety monitoring systems that combine computer vision with CCTV are priced for large corporate projects and need dedicated IT infrastructure, putting them out of reach for small and medium contractors.
- Multi-PPE detection (simultaneously checking for helmets, vests, boots, gloves, and goggles on each tracked worker) is technically harder than detecting a single item. Most available solutions only handle helmet detection.
- Without structured violation records (time, location, worker, missing PPE type), there is no way to do data-driven safety management or identify patterns of chronic non-compliance.

The consequences include preventable injuries and fatalities, regulatory penalties, project delays from accident investigations, higher insurance costs, and reputational damage for contractors.

## Key Challenges / Pain Points

- **Multi-PPE detection complexity:** Checking for five PPE categories at once on each person means the system has to associate detected PPE items with individual tracked workers through spatial analysis, not just detect objects in the frame.
- **Person tracking:** Workers move through the scene. The system needs to maintain persistent identities so it does not log the same violation over and over, and so it can spot chronic non-compliance by specific individuals.
- **Environmental variability:** Construction sites have changing lighting conditions, dust, occlusion from equipment and materials, and workers in all kinds of postures (climbing, bending, carrying loads).
- **False alarm management:** Too many false positives will destroy trust in the system. Suppression mechanisms like cooldown periods and minimum violation duration thresholds are critical.
- **Real-time processing:** Violations need to be caught while they are happening, not hours later during footage review, so corrective action can be taken immediately.
- **Cost and infrastructure limits:** Smaller contractors may have basic CCTV or even webcams but cannot invest in GPU servers, specialised cameras, or dedicated monitoring rooms.
- **Evidence and auditability:** Regulatory compliance increasingly demands documented evidence of safety monitoring practices and how violations were handled.

## Stakeholders Affected

- Construction workers whose safety depends on consistent PPE use
- Site safety officers and supervisors responsible for compliance
- Construction contractors and project managers liable for site safety
- Labour departments and workplace safety regulatory bodies
- Construction industry insurers assessing site risk
- Labour unions and worker welfare organisations

## Justification / Need for Solution

India's construction workforce numbers in the tens of millions, and workplace safety standards are being actively strengthened through legislation and regulation. The Building and Other Construction Workers (BOCW) Act and state-level occupational safety regulations increasingly call for documented evidence of safety practices on construction sites.

Insurance companies are starting to differentiate premiums based on documented safety monitoring practices. Large infrastructure projects (metro rail, highways, industrial facilities) are contractually required to demonstrate safety compliance with video evidence. These regulatory and commercial pressures are building demand for affordable, automated safety monitoring that smaller contractors can also adopt.

The technology for real-time multi-object detection and person tracking using YOLO-family models has matured enough to run on commodity hardware (mid-range GPUs or even powerful CPUs). This makes continuous PPE monitoring technically feasible at cost points well below traditional commercial safety systems.

## Existing Solutions & Gaps

**Periodic manual safety inspections:** Standard practice on most sites. They are episodic, cover only a fraction of work hours, and produce no continuous compliance data.

**CCTV with passive recording:** Widely deployed for security. However, the footage is not analysed for safety violations. Review only happens after an incident has already occurred.

**Commercial AI safety platforms (Smartvid.io, Newmetrix, Buildots):** Offer AI-powered safety analytics but come with enterprise pricing, cloud-based processing (which raises data privacy concerns), and are designed for large corporate construction firms. They are out of reach for small and medium contractors.

**Helmet-only detection systems:** Some simpler solutions detect only hard hat presence. But real PPE compliance means simultaneously monitoring multiple equipment categories (helmet, vest, boots, gloves, goggles). Single-item detection gives an incomplete picture.

The specific gap: no affordable, self-hosted system exists that performs real-time multi-PPE violation detection (five or more categories) with person tracking, duplicate suppression, evidence capture, and structured violation logging, all deployable on commodity hardware connected to existing cameras.

## Type of Innovation

- Product
- Technology

## SDG Alignment

- **SDG 3, Good Health and Well-being:** Directly addresses workplace safety and injury prevention in one of the most hazardous employment sectors.
- **SDG 8, Decent Work and Economic Growth:** Improving working conditions in construction supports the decent work agenda for a massive workforce.
- **SDG 11, Sustainable Cities and Communities:** Safer construction practices contribute to sustainable urban development and infrastructure quality.

## Target Beneficiaries

Construction workers across all project scales, site safety officers and supervisors, small and medium construction contractors, labour department inspectors, construction insurance providers, and worker welfare organisations in Tamil Nadu and across India.

## Source of Problem

This problem was identified through the development of a real-time construction safety monitoring system that performs multi-PPE violation detection (helmet, vest, boots, gloves, goggles) using a custom-trained YOLO model, implements centroid-based person tracking with persistent IDs, uses IoU-based PPE assignment per tracked person, and includes duplicate-suppression cooldowns, minimum violation frame thresholds, and asynchronous evidence capture. Building the complete pipeline, from inference through tracking, violation logic, evidence storage, database logging, and REST API analytics, revealed both the technical feasibility of affordable continuous monitoring and the specific engineering challenges (false positive management, multi-stream support, real-time performance requirements) that determine whether such a system is practically deployable.

## Geographic Relevance

State, Tamil Nadu (with National applicability)

## Expected Outcome

- Continuous PPE compliance monitoring across all active work zones instead of episodic spot checks
- Violations detected in real time, enabling corrective action while the violation is still happening
- Structured violation records (timestamp, camera, person, PPE type, evidence image) that enable data-driven safety management
- Identification of chronic non-compliance patterns, high-risk time periods, and problematic work zones
- Fewer preventable workplace injuries linked to PPE non-use
- Documented safety monitoring evidence for regulatory compliance and insurance requirements
