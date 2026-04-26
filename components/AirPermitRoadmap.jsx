"use client";
import { useState } from "react";

// ─── JURISDICTIONS ─────────────────────────────────────────────────────────
const JURISDICTIONS = {
  nwcaa:{label:"NWCAA – Northwest Clean Air Agency",state:"WA",agency:"NWCAA",phone:"(360) 428-1617",permit_name:"NOC / Order of Approval",rule_basis:"NWCAA Section 300 / WAC 173-400-110",nsr_thresholds:{CO:5,NOx:2,PM25:0.5,PM10:1.25,SO2:2,VOC:2,Lead:0.005},nsr_note:"All pollutants must be BELOW threshold simultaneously to avoid NOC. PSCAA/SWCAA have no de minimis — any increase triggers permit.",completeness_days:30,final_days:60,public_notice:"15-day internet notice; newspaper + 30-day comment if requested; major sources: mandatory",fee_note:"Per NWCAA 324.2 fee schedule",registration:"Section 320: Annual registration; emissions report April 15; per-ton fees",toxic_rule:"WAC 173-460 (SQER/ASIL → T-BACT → AERMOD 2nd-tier health risk)",psd_note:"WA Ecology retains PSD jurisdiction — NWCAA does NOT issue PSD permits",modeling_minor:"REQUIRED for ALL minor source NOC applications per WAC 173-400-113(3): allowable emissions must not cause or contribute to a violation of any ambient air quality standard. NWCAA evaluates each permit against Table 4a significance thresholds — if below all Table 4a levels, a screening-level demonstration (AERSCREEN or simplified calculation) is typically sufficient. If emissions exceed Table 4a thresholds for any pollutant, full AERMOD dispersion modeling is required to demonstrate NAAQS compliance. AERSCREEN is the most common tool for minor sources; full AERMOD required when AERSCREEN shows potential NAAQS exceedance or for more complex sites.",modeling_tap:"Step 1: Compare to WAC 173-460-150 SQER/ASIL table (formaldehyde SQER = 0.4 tpy). Step 2 (if exceeded): T-BACT analysis. Step 3 (T-BACT insufficient): full AERMOD second-tier health risk analysis.",modeling_met:"Bellingham BLI / Anacortes (Skagit/San Juan/Island). 5-year AERMET dataset.",nonattainment_note:"All NWCAA counties currently attainment/unclassifiable. Ferndale-Intalco SO2 area redesignated attainment Jan 2025.",color:"#1a4d7a",extra_notes:[]},
  pscaa:{label:"PSCAA – Puget Sound Clean Air Agency",state:"WA",agency:"PSCAA",phone:"(206) 343-8800",permit_name:"NOC / Order of Approval",rule_basis:"PSCAA Regulation I, Article 6 / WAC 173-400-110",nsr_thresholds:{CO:null,NOx:null,PM25:null,PM10:null,SO2:null,VOC:null,Lead:null},nsr_note:"NO de minimis threshold — ANY increase in air contaminant emissions triggers NOC. $3,000 filing fee at submittal.",completeness_days:30,final_days:60,public_notice:"Public notice; comment period available; major sources: extended + mandatory comment",fee_note:"$3,000 filing fee at submittal + additional processing fees",registration:"Annual registration; fee based on actual emissions ($/ton); annual compliance inspection",toxic_rule:"WAC 173-460 + PSCAA Regulation 3, Article 2, Section 2.05 (AERMOD when ASIL exceeded)",psd_note:"WA Ecology retains PSD jurisdiction — PSCAA does NOT issue PSD permits",modeling_minor:"REQUIRED for ALL minor source NOC applications per WAC 173-400-113(3): allowable emissions must not cause or contribute to a violation of any ambient air quality standard. PSCAA evaluates each permit against Table 4a significance thresholds. If below Table 4a levels for all pollutants, a simplified screening demonstration is typically sufficient. If any pollutant exceeds Table 4a thresholds, full AERMOD dispersion modeling is required. Because PSCAA has no de minimis threshold, even very small sources must demonstrate NAAQS compliance — though AERSCREEN screening is often sufficient for low-emitting sources.",modeling_tap:"WAC 173-460 + PSCAA Reg 3 Art 2 Sec 2.05: when ASIL exceeded → AERMOD required. Auer method for urban/rural classification (3 km radius). AERMOD version 22112+. 5-year AERMET met data.",modeling_met:"Seattle-Tacoma SEA (King/Pierce/Kitsap), Paine Field PAE (Snohomish). 5-year AERMET dataset.",nonattainment_note:"King, Pierce, Snohomish, Kitsap counties: attainment/unclassifiable for all current NAAQS.",color:"#1a5a7a",extra_notes:["PSCAA Regulation 3, Article 2 adds TAP modeling requirements BEYOND WAC 173-460 — both must be satisfied simultaneously."]},
  swcaa:{label:"SWCAA – Southwest Clean Air Agency",state:"WA",agency:"SWCAA",phone:"(360) 574-3058",permit_name:"Air Discharge Permit (ADP)",rule_basis:"SWCAA 400-109 / 400-110 / WAC 173-400-110",nsr_thresholds:{CO:null,NOx:null,PM25:null,PM10:null,SO2:null,VOC:null,Lead:null},nsr_note:"NO de minimis threshold — any new installation or modification increasing emissions requires an ADP. Clark County sources also subject to SWCAA 400-111 Maintenance Plan Area requirements (BACT for ALL criteria pollutants).",completeness_days:30,final_days:60,public_notice:"15-day public notice per SWCAA 400-171; 30-day comment upon request",fee_note:"Per SWCAA 400-110 fee schedule",registration:"SWCAA 400-100: Annual registration; emissions inventory due January 31; per-ton fees",toxic_rule:"WAC 173-460 (SQER/ASIL → T-BACT → AERMOD 2nd-tier) + SWCAA 400-040 general emission standards + SWCAA 400-111 maintenance plan requirements",psd_note:"WA Ecology retains PSD jurisdiction — SWCAA does NOT issue PSD permits",modeling_minor:"REQUIRED for ALL minor source Air Discharge Permit (ADP) applications per WAC 173-400-113(3): allowable emissions must not cause or contribute to a violation of any ambient air quality standard. SWCAA evaluates all permitted sources against WAC 173-400-113 Table 4a significance thresholds. Below Table 4a: simplified screening typically sufficient. Above Table 4a for any pollutant: full AERMOD dispersion modeling required. Clark County sources additionally subject to SWCAA 400-111 ambient analysis for maintenance plan compliance — BACT required for ALL criteria pollutants regardless of threshold.",modeling_tap:"WAC 173-460 SQER/ASIL → T-BACT → AERMOD second-tier. SWCAA 400-040 also requires no ambient air quality standard violations. Clark County: SWCAA 400-111 requires BACT for ALL criteria pollutants.",modeling_met:"Kelso/Longview KLS, Portland PDX. 5-year AERMET for full AERMOD.",nonattainment_note:"Clark County WA is a Portland-Vancouver OZONE MAINTENANCE PLAN area (1997 standard) — not current nonattainment but SWCAA 400-111 maintenance plan source review applies. All counties attainment for current NAAQS.",color:"#4a2a7a",extra_notes:["SWCAA 400-111 (Clark County): BACT required for ALL criteria pollutants emitted — more stringent than standard NSR regardless of emission level.","Emissions inventory due January 31 annually (NOT April 15 like NWCAA).","Clark County is Portland-Vancouver ozone MAINTENANCE area — not nonattainment, but maintenance plan source review requirements apply."]},
  ecology:{label:"WA Dept. of Ecology – Direct Jurisdiction",state:"WA",agency:"Ecology",phone:"(360) 407-6800",permit_name:"Notice of Construction (NOC)",rule_basis:"WAC 173-400-110",nsr_thresholds:{CO:5,NOx:2,PM25:0.5,PM10:1.25,SO2:2,VOC:2,Lead:0.005},nsr_note:"Standard WAC 173-400-110 NSR thresholds. Ecology acts as both local NSR and PSD authority in direct jurisdiction counties.",completeness_days:30,final_days:60,public_notice:"Public notice per WAC 173-400-171; mandatory comment for major sources",fee_note:"Per WAC 173-455 fee schedule",registration:"Annual registration and emissions inventory; fees per WAC 173-455",toxic_rule:"WAC 173-460 (SQER/ASIL → T-BACT → AERMOD 2nd-tier)",psd_note:"Ecology is the PSD authority — combined NSR/PSD process available",modeling_minor:"REQUIRED for ALL minor source NOC applications per WAC 173-400-113(3): allowable emissions must not cause or contribute to a violation of any ambient air quality standard. Ecology evaluates against Table 4a significance thresholds. Below Table 4a: simplified screening typically sufficient. Above Table 4a thresholds: full AERMOD required. Ecology is also the PSD authority in direct-jurisdiction counties — combined NSR/PSD modeling process is possible for major sources.",modeling_tap:"Standard WAC 173-460 SQER/ASIL → T-BACT → AERMOD second-tier health risk analysis.",modeling_met:"Varies by county — contact Ecology regional office for approved AERMET dataset.",nonattainment_note:"Verify attainment status for specific project county with Ecology.",color:"#1a6a4a",extra_notes:[]},
  mt_deq:{label:"Montana DEQ – Air Quality Bureau",state:"MT",agency:"Montana DEQ",phone:"(406) 444-3490",permit_name:"Montana Air Quality Permit (MAQP)",rule_basis:"Mont. Code Ann. 75-2 / ARM 17.8.700 series",nsr_thresholds:{CO:25,NOx:25,PM25:25,PM10:25,SO2:25,VOC:25,Lead:5},nsr_note:"ARM 17.8.743: MAQP required for PTE >25 tpy any regulated pollutant (Lead >5 tpy). De minimis exclusions in ARM 17.8.744-745. Confirm county program jurisdiction before filing.",completeness_days:30,final_days:40,public_notice:"30-day public comment after preliminary determination; DEQ may extend 15 days",fee_note:"Contact Montana DEQ AQB (406) 444-3490 for current fee schedule",registration:"Annual emissions inventory to DEQ; operating fees per ARM 17.8.505",toxic_rule:"ARM 17.8.900 series – demonstrate Montana AAQS compliance via AERMOD; no separate SQER-based TAP program",psd_note:"Montana DEQ is the PSD permitting authority; EPA Region 8 oversight",modeling_minor:"ARM 17.8.749: DEQ may require AERMOD/AERSCREEN for minor sources with significant emissions or near sensitive areas. Submit modeling protocol before application.",modeling_tap:"No SQER-based state TAP program. Demonstrate ARM 17.8.900 AAQS compliance via AERMOD. Near Class I areas (Glacier NP, Bob Marshall, Selway-Bitterroot): CALPUFF far-field visibility modeling + AQRV analysis required. Coordinate with Federal Land Managers (NPS/USFS).",modeling_met:"Great Falls GTF, Missoula MSO, Billings BIL, Helena HLN, Kalispell FCA. 5-year AERMET dataset.",nonattainment_note:"Most Montana counties are attainment. Check EPA Green Book for current designations. Missoula/Libby area have had historical PM concerns.",color:"#8c2a1a",extra_notes:["Montana county programs (Cascade, Missoula, Yellowstone) have delegated authority — verify local jurisdiction before filing with DEQ.","Class I areas: Glacier NP, Bob Marshall, Selway-Bitterroot require CALPUFF visibility modeling + Federal Land Manager (FLM) coordination for PSD.","No state GHG cap-and-invest program. Federal GHGRP at >=25,000 MT CO2e/yr."]},
  mt_county:{label:"Montana County Air Quality Program (Cascade / Missoula / Yellowstone)",state:"MT",agency:"Montana County Program",phone:"(406) 444-3490 (DEQ referral)",permit_name:"County Air Quality Permit",rule_basis:"MCA 75-2-215 / County Air Pollution Control Program",nsr_thresholds:{CO:25,NOx:25,PM25:25,PM10:25,SO2:25,VOC:25,Lead:5},nsr_note:"Counties with BER-approved programs have delegated authority. Confirm lead permitting authority — DEQ and county may overlap.",completeness_days:30,final_days:40,public_notice:"30-day public comment consistent with state program",fee_note:"County-specific fee schedules apply",registration:"Annual emissions reporting to county program office",toxic_rule:"ARM 17.8.900 series (AAQS compliance via AERMOD); county may have additional local requirements",psd_note:"Montana DEQ retains PSD authority; county program handles local NSR only",modeling_minor:"Similar to Montana DEQ — contact county program staff for requirements.",modeling_tap:"ARM 17.8.900 AAQS compliance. No SQER system. County programs may have additional local air quality standards.",modeling_met:"Closest NWS station to project location; coordinate with county program.",nonattainment_note:"Coordinate with county program to confirm local attainment status and any area-specific SIP requirements.",color:"#8c4a1a",extra_notes:["Contact the specific county program to confirm jurisdiction before filing."]},
  nv_ndep:{label:"NDEP BAPC – Nevada Bureau of Air Pollution Control",state:"NV",agency:"NDEP BAPC",phone:"(775) 687-9349",permit_name:"Class I or Class II AQOP",rule_basis:"NRS 445B / NAC 445B.001-445B.3497",nsr_thresholds:{CO:null,NOx:null,PM25:null,PM10:null,SO2:null,VOC:null,Lead:null},nsr_note:"Nevada requires a permit for ANY emission source (NRS 445B.155). Class I: PTE >100 tpy any pollutant, OR >25 tpy total HAP, OR >10 tpy single HAP. Class II: below Class I. BAPC covers all NV counties EXCEPT Washoe and Clark (except fossil-fuel power plants >=25 MW).",completeness_days:30,final_days:90,public_notice:"Public notice and comment; Class I: mandatory 30-day comment",fee_note:"NAC 445B fee schedule — Class I fees substantial; contact BAPC (775) 687-9349",registration:"Ongoing Class I/II AQOP; annual compliance certification and monitoring reports",toxic_rule:"NAC 445B: Environmental evaluation (AERMOD) MANDATORY for ALL new/modified sources. Nevada AAQS compliance. No SQER/ASIL TAP program.",psd_note:"NDEP BAPC is the PSD permitting authority for NDEP jurisdiction; EPA Region 9",modeling_minor:"MANDATORY for ALL new/modified sources (NAC 445B.308/311). Submit modeling protocol to BAPC and receive written approval BEFORE AQOP application. AERSCREEN acceptable for very small sources as initial screen.",modeling_tap:"No SQER/ASIL TAP program equivalent to WA. Demonstrate Nevada AAQS compliance via AERMOD for all regulated pollutants. BSC used for toxic emission minimization. Class I area analysis if within 100 km of wilderness.",modeling_met:"Las Vegas LAS, Reno RNO, Elko EKO, Winnemucca WMC. 5-year AERMET. Submit met selection in modeling protocol.",nonattainment_note:"NDEP BAPC jurisdiction counties are generally attainment/unclassifiable. Check EPA Green Book for rural Nevada counties.",color:"#4a7a1a",extra_notes:["MANDATORY: Environmental evaluation (AERMOD) required for ALL NDEP sources — not just major or TAP-exceeding. Most broadly applicable modeling requirement of the four states.","Modeling protocol must be submitted to BAPC and written approval received BEFORE AQOP application submittal — non-negotiable.","Nevada BSC (Best System of Control) = functionally same as federal BACT top-down analysis.","Nevada has no state GHG cap-and-invest program."]},
  nv_clark:{label:"Clark County DAQ – Department of Air Quality (Las Vegas metro)",state:"NV",agency:"Clark County DAQ",phone:"(702) 455-5942",permit_name:"Authority to Construct (ATC) + Operating Permit",rule_basis:"Clark County Code Title 8, Chapter 8.20",nsr_thresholds:{CO:null,NOx:null,PM25:null,PM10:null,SO2:null,VOC:null,Lead:null},nsr_note:"Clark County DAQ has independent jurisdiction for most Clark County sources. Any new source or modification requires ATC before construction. NDEP retains jurisdiction for fossil-fuel fired steam electric plants >=25 MW.",completeness_days:30,final_days:90,public_notice:"Public notice and comment for major sources; Title V: 45-day EPA review",fee_note:"Per Clark County DAQ fee schedule; contact DAQ (702) 455-5942",registration:"Annual emissions inventory and operating permit renewal; compliance inspections",toxic_rule:"Nevada AAQS compliance via AERMOD. No SQER/ASIL TAP program. Major HAP: federal NESHAP + Title V.",psd_note:"Clark County DAQ is the PSD permitting authority for Clark County; EPA Region 9",modeling_minor:"Ambient air quality analysis required for new Clark County sources. Submit AERMOD protocol to DAQ. AERSCREEN may be acceptable for very small sources.",modeling_tap:"No SQER/ASIL-based state TAP program in Nevada. Nevada AAQS compliance via AERMOD. Use BSC for toxic emission control. Las Vegas Valley: SERIOUS OZONE NONATTAINMENT (effective Jan 21, 2025) — NOx/VOC emissions require additional scrutiny and NNSR for major sources.",modeling_met:"Las Vegas LAS. 5-year AERMET. Las Vegas Valley: strong afternoon turbulence + calm morning inversions — careful AERMET characterization required.",nonattainment_note:"SERIOUS OZONE NONATTAINMENT: Las Vegas Valley reclassified serious (2015 8-hr standard) effective Jan 21, 2025 (89 FR 103657), attainment deadline Aug 3, 2027. PM10 maintenance area. Major sources (NOx >=100 tpy or VOC >=100 tpy) subject to NNSR with LAER + offsets.",color:"#6a7a1a",extra_notes:["CRITICAL: Las Vegas Valley is SERIOUS OZONE NONATTAINMENT effective Jan 21, 2025 — major NOx/VOC sources require LAER and emission offsets (not just BACT).","Las Vegas Valley is also a PM10 maintenance area — PM10 emissions require careful evaluation.","For fossil-fuel power plants >=25 MW in Clark County: confirm with NDEP BAPC whether NDEP or DAQ has jurisdiction.","Clark County DAQ requires AERMOD modeling for new sources — submit protocol before application."]},
  nv_washoe:{label:"NNPH AQMD – Northern Nevada Public Health (Reno-Sparks / Washoe County)",state:"NV",agency:"NNPH AQMD",phone:"(775) 784-7200",permit_name:"Air Quality Operating Permit / Authority to Construct",rule_basis:"NNPH Chapter 030 (effective January 1, 2025)",nsr_thresholds:{CO:null,NOx:null,PM25:null,PM10:null,SO2:null,VOC:null,Lead:null},nsr_note:"Permit required if facility emits >=2 lbs/day criteria pollutants or >=1 lb/day HAPs. BSC required per Chapter 030. Major source thresholds mirror federal PSD (250/100 tpy).",completeness_days:30,final_days:90,public_notice:"Public notice and comment per NNPH Chapter 030; Title V: 45-day EPA review for major sources",fee_note:"Per NNPH fee schedule; contact AQMD (775) 784-7200",registration:"Annual emissions inventory per NNPH schedule; annual operating permit fees",toxic_rule:"NNPH AAQS compliance via AERMOD per Chapter 030. No SQER/ASIL TAP program.",psd_note:"NNPH AQMD is the PSD permitting authority for Washoe County; EPA Region 9",modeling_minor:"AERMOD or AERSCREEN required for new sources per Chapter 030. Submit protocol to NNPH AQMD.",modeling_tap:"No SQER/ASIL TAP program. Nevada AAQS compliance via AERMOD. AERMAP terrain data required for Reno basin (significant terrain effects).",modeling_met:"Reno RNO. 5-year AERMET. Reno basin has significant terrain effects and temperature inversions — AERMAP required.",nonattainment_note:"Washoe County currently attainment for all criteria pollutants. Historical PM10 concerns from dust/wildfire. Check EPA Green Book.",color:"#2a6a4a",extra_notes:["NNPH Chapter 030 comprehensively updated effective January 1, 2025 — use only the current version for all applications.","Reno basin terrain effects significant — AERMAP terrain data required for AERMOD."]},
  id_deq:{label:"Idaho DEQ – Air Quality Division (statewide)",state:"ID",agency:"Idaho DEQ",phone:"1-877-573-7648",permit_name:"Permit to Construct (PTC) / Tier I or Tier II Operating Permit",rule_basis:"IDAPA 58.01.01 (Rules for Control of Air Pollution in Idaho)",nsr_thresholds:{CO:25,NOx:25,PM25:25,PM10:25,SO2:25,VOC:25,Lead:0.5},nsr_note:"IDAPA 58.01.01 Section 200: PTC required above de minimis BRC levels (~25 tpy criteria; 0.5 tpy lead). Category I/II exemptions for very small sources. Tier I = Title V for major sources. Tier II = state-only for minor sources requiring emission caps.",completeness_days:30,final_days:90,public_notice:"30-day public comment for major source PTC; public meeting may be required for large projects",fee_note:"Contact Idaho DEQ Air Quality Permit Hotline (1-877-573-7648) for current fee schedule",registration:"Annual emissions inventory and operating fees; Tier I/II holders report annually",toxic_rule:"IDAPA 58.01.01 Section 580: Screening Emission Levels (EL, carcinogens) + Acceptable Ambient Concentrations (AAC, non-carcinogens); AERMOD required when EL/AAC exceeded",psd_note:"Idaho DEQ is the PSD permitting authority; EPA Region 10. Modeling protocol MUST be submitted >=1 month before PTC application.",modeling_minor:"Not required below BRC levels. Required when approaching NAAQS. MANDATORY: submit modeling protocol to Idaho DEQ and receive written approval BEFORE PTC application if modeling is needed — minimum 1-month lead time.",modeling_tap:"IDAPA 58.01.01 Section 580: Different from WA — no SQER/ASIL step. Screen against EL (carcinogens) and AAC (non-carcinogens). If EL/AAC exceeded: AERMOD ambient demonstration required. Submit TAP modeling protocol to Idaho DEQ before application.",modeling_met:"Boise BOI, Twin Falls TWF, Pocatello PIH, Idaho Falls IDA, Lewiston LWS. 5-year AERMET dataset. Submit met data selection in modeling protocol.",nonattainment_note:"Pocatello (Bannock County): PM2.5 nonattainment. Check EPA Green Book for all current Idaho designations before site selection.",color:"#3a3a8c",extra_notes:["MANDATORY: Air quality modeling protocol must be submitted and written approval received from Idaho DEQ BEFORE PTC application — minimum 1-month lead time. Non-negotiable.","Idaho DEQ has 6 regional offices — contact the regional office for your project location.","Tribal lands: EPA Region 10 (not Idaho DEQ) has permitting authority on tribal lands within Idaho — different regulatory process.","Idaho TAP uses EL/AAC terminology (different from WA SQER/ASIL but similar concept).","No state GHG cap-and-invest program. Federal GHGRP at >=25,000 MT CO2e/yr."]}
};

const JURISDICTION_BY_STATE = {
  WA:[{v:"nwcaa",l:"NWCAA – Island, San Juan, Skagit, Whatcom Counties"},{v:"pscaa",l:"PSCAA – King, Pierce, Snohomish, Kitsap Counties"},{v:"swcaa",l:"SWCAA – Clark, Cowlitz, Lewis, Skamania, Wahkiakum Counties"},{v:"ecology",l:"WA Ecology – Direct Jurisdiction (other WA counties)"}],
  MT:[{v:"mt_deq",l:"Montana DEQ Air Quality Bureau (statewide primary)"},{v:"mt_county",l:"Montana County Program (Cascade / Missoula / Yellowstone Counties)"}],
  NV:[{v:"nv_ndep",l:"NDEP BAPC – All counties except Washoe and Clark (most sources)"},{v:"nv_clark",l:"Clark County DAQ – Las Vegas metro (SERIOUS OZONE NONATTAINMENT)"},{v:"nv_washoe",l:"NNPH AQMD – Reno-Sparks / Washoe County"}],
  ID:[{v:"id_deq",l:"Idaho DEQ Air Quality Division (statewide)"}]
};

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const BASE_QUESTIONS = [
  {id:"state",section:"Project Location",q:"In which state will this facility operate?",opts:[{v:"WA",l:"Washington State"},{v:"MT",l:"Montana"},{v:"NV",l:"Nevada"},{v:"ID",l:"Idaho"}]},
  {id:"jurisdiction",section:"Project Location",q:"Which specific air quality jurisdiction applies?",dynamic:true},
  {id:"source_type",section:"Source Classification",q:"What best describes the primary emission source type?",opts:[{v:"combustion_turbine",l:"Combustion Turbine / Gas Turbine"},{v:"rice_si",l:"Reciprocating ICE – Spark Ignition (natural gas / propane)"},{v:"rice_ci",l:"Reciprocating ICE – Compression Ignition (diesel)"},{v:"boiler_large",l:"Boiler / Steam Generator > 100 MMBtu/hr"},{v:"boiler_small",l:"Boiler / Steam Generator 10-100 MMBtu/hr"},{v:"fuel_cell",l:"Fuel Cell (PAFC, SOFC, PEMFC, MCFC)"},{v:"industrial",l:"Industrial Process (non-combustion primary)"},{v:"combined",l:"Combined / Multiple Source Types"},{v:"other",l:"Other"}]},
  {id:"operation_type",section:"Source Classification",q:"What is the intended operational mode?",opts:[{v:"prime_power",l:"Prime Power – Continuous / Baseload Generation"},{v:"peaker",l:"Peaker / Load-Following / Demand Response"},{v:"emergency",l:"Emergency Standby Only (< 500 hrs/yr, no grid export)"},{v:"chp",l:"Combined Heat & Power (CHP / Cogeneration)"},{v:"industrial",l:"Industrial Process (non-power generation)"}]},
  {id:"fuel_type",section:"Source Classification",q:"What is the primary fuel type?",opts:[{v:"natural_gas",l:"Natural Gas (pipeline quality)"},{v:"diesel",l:"Diesel / Distillate Oil (#2 fuel oil)"},{v:"hydrogen",l:"Hydrogen (or H2 blend)"},{v:"dual_fuel",l:"Dual Fuel (natural gas primary, diesel backup)"},{v:"biogas",l:"Biogas / Landfill Gas / Digester Gas"},{v:"coal",l:"Coal or Solid Fuel"},{v:"other_fuel",l:"Other / Process Gas"}]},
  {id:"heat_input",section:"Source Sizing",q:"Total maximum heat input capacity?",opts:[{v:"lt10",l:"< 10 MMBtu/hr"},{v:"10to50",l:"10–50 MMBtu/hr"},{v:"50to100",l:"50–100 MMBtu/hr"},{v:"100to250",l:"100–250 MMBtu/hr"},{v:"gt250",l:"> 250 MMBtu/hr"},{v:"na",l:"Not Applicable / TBD"}]},
  {id:"attainment",section:"Attainment Status",q:"Is the facility in an EPA-designated nonattainment area for any criteria pollutant?",opts:[{v:"attainment_all",l:"Attainment / Unclassifiable for all criteria pollutants"},{v:"nonattainment_ozone",l:"Nonattainment – Ozone (incl. Las Vegas Valley serious nonattainment)"},{v:"nonattainment_pm25",l:"Nonattainment – PM2.5 (incl. Pocatello ID)"},{v:"nonattainment_pm10",l:"Nonattainment – PM10"},{v:"nonattainment_co",l:"Nonattainment – CO"},{v:"nonattainment_multi",l:"Nonattainment – Multiple pollutants"},{v:"maintenance",l:"Maintenance Plan Area (Portland-Vancouver area / Clark Co WA)"},{v:"unknown",l:"Unknown – need to verify with agency"}]},
  // PTE questions are DYNAMIC — built from jurisdiction thresholds
  {id:"pte_co",section:"Criteria Pollutant PTE",q:"Potential to Emit – Carbon Monoxide (CO)?",dynamicOpts:true,pollutant:"CO",psd_ser:"100 tpy"},
  {id:"pte_nox",section:"Criteria Pollutant PTE",q:"Potential to Emit – Nitrogen Oxides (NOₓ)?",dynamicOpts:true,pollutant:"NOx",psd_ser:"40 tpy"},
  {id:"pte_pm25",section:"Criteria Pollutant PTE",q:"Potential to Emit – PM2.5?",dynamicOpts:true,pollutant:"PM25",psd_ser:"10 tpy"},
  {id:"pte_pm10",section:"Criteria Pollutant PTE",q:"Potential to Emit – PM10?",dynamicOpts:true,pollutant:"PM10",psd_ser:"25 tpy"},
  {id:"pte_so2",section:"Criteria Pollutant PTE",q:"Potential to Emit – Sulfur Dioxide (SO₂)?",dynamicOpts:true,pollutant:"SO2",psd_ser:"40 tpy"},
  {id:"pte_voc",section:"Criteria Pollutant PTE",q:"Potential to Emit – Volatile Organic Compounds (VOC)?",dynamicOpts:true,pollutant:"VOC",psd_ser:"40 tpy"},
  {id:"pte_lead",section:"Criteria Pollutant PTE",q:"Does the facility have potential to emit Lead (Pb)?",dynamicOpts:true,pollutant:"Lead",psd_ser:"0.6 tpy"},
  {id:"hap",section:"Hazardous Air Pollutants",q:"Does the facility emit HAPs listed under 42 USC 7412?",opts:[{v:"no",l:"No / Not expected"},{v:"area_source",l:"Yes – total HAPs < 10 tpy AND single HAP < 2.5 tpy (Area Source)"},{v:"major_source",l:"Yes – total HAPs ≥ 10 tpy OR any single HAP ≥ 2.5 tpy (Major HAP Source)"},{v:"unknown",l:"Unknown / Need to evaluate"}]},
  {id:"tap",section:"Toxic Air Pollutants (State)",q:"Does the facility emit state-regulated Toxic Air Pollutants?",opts:[{v:"no",l:"No / Not expected"},{v:"below_sqer",l:"Yes – all TAPs below state screening thresholds (WA SQER/ASIL · ID EL/AAC · NV/MT: AAQS compliance)"},{v:"above_sqer",l:"Yes – one or more TAPs may exceed state screening threshold (T-BACT or AERMOD required)"},{v:"unknown",l:"Unknown / Need screening"}]},
  {id:"ghg",section:"Greenhouse Gases",q:"Estimated facility GHG emissions (CO₂e/yr)?",opts:[{v:"lt10k",l:"< 10,000 MT CO₂e/yr"},{v:"10k_25k",l:"10,000–25,000 MT CO₂e/yr (WA GHG reporting: 10,000 MT)"},{v:"25k_100k",l:"25,000–100,000 MT CO₂e/yr (EPA GHGRP threshold: 25,000 MT)"},{v:"gt100k",l:"> 100,000 MT CO₂e/yr (WA Cap-and-Invest; EPA GHGRP required)"},{v:"unknown",l:"Unknown / TBD"}]},
  {id:"new_or_mod",section:"Project Nature",q:"New greenfield facility or modification to existing source?",opts:[{v:"new",l:"New greenfield facility"},{v:"modification",l:"Modification to existing permitted source"},{v:"replacement",l:"Replacement of existing emission unit"}]},
  {id:"ej_sensitive",section:"Project Context",q:"Is the facility near sensitive receptors or EJ communities?",opts:[{v:"no",l:"No – rural or industrial area, no sensitive receptors within 1 mile"},{v:"moderate",l:"Moderate – residential areas or schools within 0.5–1 mile"},{v:"high",l:"High – EJ community, schools, hospitals, or daycares within 0.5 mile"},{v:"unknown",l:"Unknown / Need to assess"}]}
];

function buildDynamicOpts(q, jcfg) {
  if (!q.dynamicOpts) return q.opts;
  const t = jcfg?.nsr_thresholds?.[q.pollutant];
  const tLabel = t == null ? "any increase triggers permit" : `< ${t} tpy`;
  const aboveLabel = t == null ? "any PTE (permit required)" : `≥ ${t} tpy (NSR triggered)`;
  const psdSer = q.psd_ser;
  return [
    {v:"below_nsr", l:`Below NSR threshold (${tLabel}) — permit may not be required`},
    {v:"nsr_minor", l:`${aboveLabel}; below PSD SER (${psdSer}) — minor source permit required`},
    {v:"psd_ser",   l:`Above PSD SER (${psdSer}) — major source analysis required if also above major threshold`},
    {v:"major",     l:"Above major source threshold (250 tpy general / 100 tpy listed categories) — Title V + PSD required"},
    {v:"unknown",   l:"Unknown / TBD"}
  ];
}

// ─── BACT GUIDANCE ────────────────────────────────────────────────────────────
const BACT_GUIDANCE = {
  combustion_turbine:{title:"Combustion Turbines (Subpart KKKK/KKKKa)",pollutants:[
    {p:"NOx",t1:"DLN combustors + SCR",t1l:"2–9 ppm @ 15% O₂",t2:"DLN combustors only",t2l:"15–25 ppm @ 15% O₂",notes:"NSPS KKKKa (post-Dec 13 2024): Large >850 MMBtu/hr high-util: 9 ppm (SCR BSER). Medium high-util: 15 ppm. Small/low-util: 25 ppm. WA/MT/ID = BACT; NV = BSC (same analysis)."},
    {p:"CO",t1:"Oxidation catalyst",t1l:"2–10 ppm @ 15% O₂",t2:"Good combustion practices",t2l:"25–50 ppm",notes:"CO catalyst routinely required in all four states. Search RBLC (rblc.epa.gov) for comparable regional permits."},
    {p:"VOC/Formaldehyde",t1:"Oxidation catalyst (co-benefit with CO)",t1l:"1–5 ppmvd @ 15% O₂",t2:"Good combustion design",t2l:"2–10 ppmvd",notes:"WA/ID: formaldehyde TAP triggers T-BACT/EL-AERMOD. MT/NV: AAQS compliance via AERMOD. Oxidation catalyst addresses CO, VOC, and formaldehyde simultaneously."},
    {p:"PM/PM2.5",t1:"Low-ash fuel + good combustion",t1l:"0.003–0.006 lb/MMBtu",t2:"N/A (nat gas turbines)",t2l:"N/A",notes:"Natural gas turbines inherently low PM. BACT/BSC = good combustion + fuel quality spec across all states."},
    {p:"SO2",t1:"Low-sulfur fuel spec (nat gas <0.2 gr/100 scf)",t1l:"<0.001 lb/MMBtu",t2:"N/A for pipeline nat gas",t2l:"N/A",notes:"Distillate backup: ULSD <15 ppm sulfur. BACT/BSC = fuel specification condition."}
  ]},
  rice_si:{title:"Spark Ignition RICE (Subpart JJJJ / NESHAP ZZZZ)",pollutants:[
    {p:"NOx",t1:"NSCR (three-way catalyst) — rich-burn",t1l:"0.14 g/HP-hr (≥500 HP rich-burn)",t2:"Lean-burn combustion optimization",t2l:"1.0–1.5 g/HP-hr",notes:"NSPS JJJJ floors apply in all four states. WA BACT often requires NSCR for rich-burn at major sources."},
    {p:"CO",t1:"Three-way catalyst / NSCR (rich-burn)",t1l:"0.14–2.61 g/HP-hr",t2:"Air-fuel ratio control (lean-burn)",t2l:"2.61 g/HP-hr",notes:"NSPS JJJJ CO limits = BACT/BSC floor. WA/ID major sources may require oxidation catalyst on lean-burn (0.1–0.5 g/HP-hr)."},
    {p:"VOC/HC",t1:"Three-way or oxidation catalyst",t1l:"0.05 g/HP-hr",t2:"Manufacturer combustion tuning",t2l:"0.60 g/HP-hr",notes:"WA: formaldehyde SQER 0.4 tpy commonly triggers T-BACT. ID: EL threshold. MT/NV: AAQS demonstration."},
    {p:"PM2.5",t1:"Good combustion + low-ash lube oil",t1l:"<0.02 g/HP-hr",t2:"No PM NSPS limit for SI engines",t2l:"N/A",notes:"BACT/BSC = good combustion practices across all four states."}
  ]},
  rice_ci:{title:"Compression Ignition RICE (Subpart IIII / NESHAP ZZZZ)",pollutants:[
    {p:"NOx+NMHC",t1:"Tier 4 certified engine",t1l:"0.30 g/kW-hr (50–560 kW)",t2:"Tier 3 (emergency standby only)",t2l:"4.0 g/kW-hr",notes:"NSPS IIII mandates Tier 4 for prime power CI RICE in all four states. ULSD required."},
    {p:"PM",t1:"Tier 4 + Diesel Particulate Filter (DPF)",t1l:"0.02 g/kW-hr",t2:"Tier 4 without DPF",t2l:"0.03–0.04 g/kW-hr",notes:"DPF most cost-effective >500 kW. ULSD required."},
    {p:"CO",t1:"Diesel Oxidation Catalyst (DOC)",t1l:"<1.0 g/kW-hr",t2:"Good combustion practices",t2l:"1.0–3.5 g/kW-hr",notes:"NESHAP ZZZZ: CO ≤23 ppmvd for new CI at major HAP sources. DOC as BACT/BSC at major sources."},
    {p:"SO2",t1:"ULSD fuel (<15 ppm S) — required for Tier 4",t1l:"<0.001 lb/MMBtu",t2:"Low-sulfur diesel (<500 ppm S)",t2l:"<0.01 lb/MMBtu",notes:"ULSD mandatory for Tier 4. SO2 BACT/BSC = fuel specification condition."}
  ]},
  boiler_large:{title:"Large Boilers >100 MMBtu/hr (Subpart Db / NESHAP DDDDD)",pollutants:[
    {p:"NOx",t1:"Low-NOx burners + SCR",t1l:"0.04 lb/MMBtu (nat gas)",t2:"LNB + SNCR or FGR",t2l:"0.10 lb/MMBtu",notes:"NSPS Db: 0.10 lb/MMBtu nat gas. BACT/BSC at major sources: SCR routinely required."},
    {p:"CO",t1:"O₂ trim + low-excess-air combustion",t1l:"<50 ppm",t2:"Burner management system",t2l:"<200 ppm",notes:"Combustion management BACT. Oxidation catalyst must be evaluated and rejected with documentation."},
    {p:"PM/PM2.5",t1:"Fabric filter (baghouse) or ESP",t1l:"0.005 lb/MMBtu",t2:"Multiclone cyclone",t2l:"0.01 lb/MMBtu",notes:"NSPS Db: 0.01 lb/MMBtu gas-fired. Gas-fired BACT = good combustion."},
    {p:"SO2",t1:"Low-sulfur fuel spec (nat gas)",t1l:"<0.001 lb/MMBtu",t2:"Wet scrubber / FGD (coal/oil)",t2l:"0.01 lb/MMBtu",notes:"Gas-fired BACT = fuel spec in all four states."}
  ]},
  boiler_small:{title:"Small-Medium Boilers 10–100 MMBtu/hr (Subpart Dc / NESHAP JJJJJJ)",pollutants:[
    {p:"NOx",t1:"Low-NOx burners + FGR",t1l:"0.06 lb/MMBtu (nat gas)",t2:"Low-NOx burners alone",t2l:"0.10 lb/MMBtu",notes:"NSPS Dc has no NOx limit. BACT/BSC required in all four states if PTE exceeds NSR thresholds."},
    {p:"CO",t1:"O₂ trim + automated burner controls",t1l:"<100 ppm",t2:"Good combustion practices",t2l:"<400 ppm",notes:"No NSPS CO limit for Subpart Dc. BACT/BSC = combustion optimization."},
    {p:"PM",t1:"Good combustion (gas-fired) / baghouse (solid fuel)",t1l:"0.01 lb/MMBtu (gas)",t2:"N/A for natural gas",t2l:"N/A",notes:"NSPS Dc PM: 0.01 lb/MMBtu (gas). Gas-fired BACT = good combustion."}
  ]},
  fuel_cell:{title:"Fuel Cell Systems (No direct NSPS — analogy methodology required)",pollutants:[
    {p:"NOx",t1:"Inherently low (electrochemical — no combustion NOx from stack)",t1l:"<0.1 lb/MWh (SOFC/MCFC)",t2:"Reformer: low-NOx burner design",t2l:"<0.5 lb/MWh reformer",notes:"No RBLC precedents for fuel cells in WA/MT/NV/ID. Document analogy approach. MT/ID may require demonstrating equivalency to combustion turbine standards for reformer."},
    {p:"CO",t1:"Catalytic oxidizer / tail gas oxidizer",t1l:"<10 ppm at exhaust",t2:"Good reformer / anode off-gas design",t2l:"<50 ppm",notes:"Primary control for CO from incomplete reformate oxidation. Document BACT/BSC equivalency across all state programs."},
    {p:"VOC/Formaldehyde",t1:"Oxidation catalyst on reformer exhaust",t1l:"<1 ppmvd formaldehyde",t2:"Low-temperature reformer operation",t2l:"<5 ppmvd",notes:"WA: formaldehyde SQER 0.4 tpy almost certainly triggers T-BACT + second-tier. ID: evaluate against IDAPA EL/AAC. MT/NV: AAQS compliance via AERMOD."},
    {p:"PM2.5",t1:"Good combustion/reformer design (near-zero)",t1l:"<0.001 lb/hr",t2:"N/A",t2l:"N/A",notes:"Document in BACT/BSC analysis. Condensable PM from steam venting may need evaluation in cold climates (MT/ID)."}
  ]}
};

const NAAQS_DATA = [
  {p:"CO",std:"9 ppm (8-hr); 35 ppm (1-hr) primary",ser:"100 tpy",major:"250 tpy general / 100 tpy listed"},
  {p:"NOx (NO₂)",std:"0.053 ppm annual; 0.100 ppm 1-hr primary",ser:"40 tpy",major:"250 tpy general / 100 tpy listed"},
  {p:"PM2.5",std:"9.0 µg/m³ annual (revised Feb 2024); 35 µg/m³ 24-hr",ser:"10 tpy",major:"250 tpy general / 100 tpy listed"},
  {p:"PM10",std:"150 µg/m³ 24-hr primary",ser:"25 tpy",major:"250 tpy general / 100 tpy listed"},
  {p:"SO₂",std:"0.075 ppm 1-hr primary; 10 ppb annual secondary (Jan 2025)",ser:"40 tpy",major:"250 tpy general / 100 tpy listed"},
  {p:"Ozone",std:"0.070 ppm 8-hr primary/secondary",ser:"40 tpy (NOx or VOC)",major:"250 tpy attainment / 100 tpy listed / 50 tpy ozone NA"},
  {p:"Lead",std:"0.15 µg/m³ rolling 3-month avg",ser:"0.6 tpy",major:"0.6 tpy triggers PSD SER"},
  {p:"GHGs (CO₂e)",std:"No NAAQS; PSD provisions apply",ser:"75,000 MT CO₂e/yr",major:"100,000 MT CO₂e/yr (Title V GHG)"}
];

const MODELING_MATRIX = [
  {agency:"NWCAA (WA)",minor_criteria:"REQUIRED per WAC 173-400-113(3): ALL NOC applicants must demonstrate allowable emissions will not cause or contribute to NAAQS violation. Compare to Table 4a significance thresholds — if below all thresholds, AERSCREEN screening typically sufficient. If any pollutant exceeds Table 4a: full AERMOD required.",major_criteria:"Full AERMOD required (WAC 173-400-720). 5-yr AERMET. PSD increment + Class I area analysis if within 100 km.",tap_approach:"WAC 173-460: Screen vs SQER/ASIL → T-BACT → AERMOD second-tier health risk. Formaldehyde SQER = 0.4 tpy commonly drives second-tier for combustion sources.",protocol:"No formal protocol submission required for minor source modeling. Consult NWCAA engineer before beginning major source AERMOD analysis.",nuance:"WAC 173-400-113(3) applies to ALL new sources — minor source NAAQS demonstration is a substantive requirement, not optional. NWCAA 300.4(D) thresholds determine if NOC is required, but Table 4a governs NAAQS demonstration."},
  {agency:"PSCAA (WA)",minor_criteria:"REQUIRED per WAC 173-400-113(3): ALL NOC applicants must demonstrate allowable emissions will not cause or contribute to NAAQS violation. PSCAA has no de minimis — every source must demonstrate NAAQS compliance. AERSCREEN typically sufficient below Table 4a thresholds; full AERMOD if exceeded.",major_criteria:"Full AERMOD required. Auer method for urban/rural classification (3 km radius). AERMOD v22112+. 5-yr AERMET.",tap_approach:"WAC 173-460 + PSCAA Reg 3 Art 2 Sec 2.05: when ASIL exceeded → AERMOD required. Both WAC 173-460 AND Reg 3 Art 2 must be satisfied simultaneously.",protocol:"Pre-consultation with PSCAA staff strongly recommended before beginning AERMOD analysis. No formal protocol submission required but informal review encouraged.",nuance:"PSCAA Reg 3 Art 2 adds mandatory AERMOD beyond WAC 173-460. Any increase in emissions triggers NOC — no de minimis threshold. Every NOC applicant must address NAAQS compliance."},
  {agency:"SWCAA (WA)",minor_criteria:"REQUIRED per WAC 173-400-113(3): ALL ADP applicants must demonstrate allowable emissions will not cause or contribute to NAAQS violation. SWCAA evaluates against Table 4a thresholds — AERSCREEN typically sufficient below thresholds; full AERMOD if exceeded. Clark County: SWCAA 400-111 adds maintenance plan ambient analysis requirement.",major_criteria:"Full AERMOD required. Clark County sources: SWCAA 400-111 maintenance plan BACT and ambient analysis for ALL criteria pollutants.",tap_approach:"WAC 173-460 SQER/ASIL → T-BACT → AERMOD second-tier. SWCAA 400-040 also requires no WAC 173-476 ambient standard violations.",protocol:"Contact SWCAA for current modeling guidance. No formal protocol submission required for minor sources.",nuance:"SWCAA 400-111 (Clark County maintenance plan area): BACT required for ALL criteria pollutants regardless of emission level. WAC 173-400-113(3) NAAQS demonstration applies to all WA permits including SWCAA."},
  {agency:"Montana DEQ",minor_criteria:"Case-by-case per ARM 17.8.749. May require AERMOD/AERSCREEN for significant minor sources near sensitive areas. Submit protocol before application.",major_criteria:"Full AERMOD required. Near Class I areas: CALPUFF far-field visibility modeling + AQRV analysis. Coordinate with Federal Land Managers (NPS/USFS).",tap_approach:"No SQER-based TAP program. Demonstrate ARM 17.8.900 AAQS compliance via AERMOD. Near Class I: CALPUFF required.",protocol:"Submit modeling protocol to Montana DEQ before application for projects requiring modeling.",nuance:"Class I area analysis (CALPUFF) is unique to MT/ID compared to WA programs. FLMs have independent 30-day review authority."},
  {agency:"NDEP BAPC (NV)",minor_criteria:"MANDATORY for ALL new/modified sources (NAC 445B.308/311). No minimum emission threshold — all sources must demonstrate AAQS compliance. AERSCREEN acceptable for very small sources.",major_criteria:"Full AERMOD required. Class I area analysis if within 100 km.",tap_approach:"No SQER/ASIL TAP program. Nevada AAQS compliance via AERMOD. BSC minimizes toxic emissions. No separate T-BACT or second-tier health risk analysis framework.",protocol:"MANDATORY: Submit modeling protocol to BAPC and receive written approval BEFORE AQOP application. Non-negotiable prerequisite.",nuance:"NDEP requires modeling for ALL sources — most broadly applicable modeling requirement of the four states. Unique compared to WA's SQER-triggered approach."},
  {agency:"Clark County DAQ (NV)",minor_criteria:"Ambient air quality analysis required for new sources. Submit protocol to DAQ. AERSCREEN may be acceptable for very small sources.",major_criteria:"Full AERMOD. Las Vegas Valley is SERIOUS OZONE NONATTAINMENT — major NOx/VOC sources subject to NNSR (LAER + offsets).",tap_approach:"No SQER/ASIL TAP program. Nevada AAQS compliance via AERMOD. Ozone precursor (NOx/VOC) analysis critical given nonattainment designation.",protocol:"Submit modeling protocol to Clark County DAQ before application.",nuance:"SERIOUS OZONE NONATTAINMENT (Las Vegas Valley, Jan 2025): major sources with NOx ≥100 tpy or VOC ≥100 tpy require LAER + emission offsets — significantly more stringent than BACT."},
  {agency:"NNPH AQMD (NV)",minor_criteria:"Modeling required for new sources per Chapter 030. AERSCREEN may be acceptable for very small sources. Submit protocol to NNPH.",major_criteria:"Full AERMOD required. AERMAP terrain data required for Reno basin.",tap_approach:"No SQER/ASIL TAP program. Nevada AAQS compliance via AERMOD. AERMAP terrain data essential for Reno basin accuracy.",protocol:"Submit modeling protocol to NNPH AQMD before application.",nuance:"Reno basin terrain effects significant — AERMAP terrain data required. Chapter 030 updated Jan 1, 2025."},
  {agency:"Idaho DEQ",minor_criteria:"Not required below BRC levels. Required when approaching NAAQS. MANDATORY: submit modeling protocol to Idaho DEQ ≥1 month before PTC application if modeling is needed.",major_criteria:"Full AERMOD required. Class I area analysis for Frank Church, Sawtooth, Selway-Bitterroot if within 100 km.",tap_approach:"IDAPA 58.01.01 Section 580: Screen against EL (carcinogens) and AAC (non-carcinogens). If exceeded: AERMOD ambient demonstration required. No SQER step — different from WA process.",protocol:"MANDATORY: Protocol submitted to Idaho DEQ and written approval received BEFORE PTC application. Minimum 1-month lead time. Required regardless of source size if modeling is needed.",nuance:"Idaho TAP: EL/AAC terminology differs from WA SQER/ASIL but similar function. Pocatello PM2.5 nonattainment — check background concentrations carefully."}
];

const STATE_COMPARE = [
  {field:"NSR Lead Agency",WA:"Local LCAA or Ecology",MT:"Montana DEQ AQB (+ county programs)",NV:"NDEP BAPC / Clark Co DAQ / NNPH AQMD",ID:"Idaho DEQ"},
  {field:"PSD Lead Agency",WA:"WA Dept. of Ecology (statewide)",MT:"Montana DEQ",NV:"Respective local agency",ID:"Idaho DEQ"},
  {field:"NSR Permit Name",WA:"Notice of Construction (NOC)",MT:"Montana Air Quality Permit (MAQP)",NV:"Class I/II AQOP + ATC",ID:"Permit to Construct (PTC)"},
  {field:"NSR Threshold CO",WA:"NWCAA: 5 tpy / PSCAA/SWCAA: any increase",MT:"25 tpy",NV:"Any emission = permit required",ID:"~25 tpy (BRC de minimis)"},
  {field:"NSR Threshold NOx",WA:"NWCAA: 2 tpy / PSCAA/SWCAA: any increase",MT:"25 tpy",NV:"Any emission = permit required",ID:"~25 tpy"},
  {field:"NSR Threshold PM2.5",WA:"NWCAA: 0.5 tpy / PSCAA/SWCAA: any",MT:"25 tpy",NV:"Any emission = permit required",ID:"~25 tpy"},
  {field:"NSR Threshold VOC",WA:"NWCAA: 2 tpy / PSCAA/SWCAA: any",MT:"25 tpy",NV:"Any emission = permit required",ID:"~25 tpy"},
  {field:"NSR Threshold Lead",WA:"NWCAA: 0.005 tpy / PSCAA/SWCAA: any",MT:"5 tpy",NV:"Any emission = permit required",ID:"0.5 tpy"},
  {field:"BACT/BSC Terminology",WA:"BACT (NSR) / T-BACT (TAPs)",MT:"BACT (ARM 17.8)",NV:"BSC (minor) / BACT (major/PSD)",ID:"BACT (IDAPA 58.01.01)"},
  {field:"State TAP Program",WA:"WAC 173-460 SQER/ASIL → T-BACT → AERMOD 2nd-tier",MT:"None (ARM 17.8.900 AAQS compliance)",NV:"No SQER system; Nevada AAQS via AERMOD",ID:"IDAPA 58.01.01 Sec 580 EL/AAC → AERMOD"},
  {field:"Criteria Modeling — Minor",WA:"Not routine (NWCAA/PSCAA); SWCAA screens all",MT:"Case-by-case; required near Class I areas",NV:"MANDATORY for ALL sources",ID:"Not required below BRC; protocol required if needed"},
  {field:"Key Nonattainment",WA:"Clark Co WA: ozone maintenance plan area (400-111)",MT:"Check EPA Green Book",NV:"Clark Co NV: SERIOUS ozone NA (Jan 2025); PM10 maint. Pocatello ID: PM2.5 NA",ID:"Pocatello: PM2.5 nonattainment"},
  {field:"State GHG Program",WA:"WAC 173-441 reporting + Cap-and-Invest",MT:"None (GHGRP only)",NV:"None (GHGRP only)",ID:"None (GHGRP only)"},
  {field:"EPA Region",WA:"Region 10",MT:"Region 8",NV:"Region 9",ID:"Region 10"}
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const PC = {"Pre-Application":"#1b5e8c","Permit Application":"#5e1b8c","Agency Review":"#8c5e1b","Public Process":"#1b8c4a","PSD / Title V":"#8c1b1b","Post-Construction":"#1b7a6e","Ongoing Compliance":"#3a4a7a","Construction":"#4a5a2a"};
const SEV = {high:{c:"#c0392b",bg:"#fdf0f0",l:"HIGH"},medium:{c:"#d68910",bg:"#fdf8e1",l:"MED"},low:{c:"#1e8449",bg:"#eafaf1",l:"LOW"}};
const ST_COLORS = {WA:"#1a4d7a",MT:"#8c2a1a",NV:"#4a7a1a",ID:"#3a3a8c"};

function cc(cat){
  if(!cat)return"#4a4a7a";
  if(cat.includes("NSPS")||cat.includes("NESHAP"))return"#1a4d7a";
  if(cat.includes("Title V")||cat.includes("PSD")||cat.includes("Nonattainment"))return"#6b1a7a";
  if(cat.includes("GHG")||cat.includes("Cap-and-Invest"))return"#1a5a2a";
  if(cat.includes("Toxic")||cat.includes("TAP")||cat.includes("AAQS")||cat.includes("Environmental Eval"))return"#7a1a5a";
  if(cat.includes("Montana"))return"#8c2a1a";
  if(cat.includes("Nevada")||cat.includes("NDEP")||cat.includes("Clark")||cat.includes("NNPH"))return"#4a7a1a";
  if(cat.includes("Idaho"))return"#3a3a8c";
  return"#1a4d7a";
}

// ─── ENGINE ────────────────────────────────────────────────────────────────
function buildResults(a) {
  const jcfg = JURISDICTIONS[a.jurisdiction] || {};
  const isWA = a.state==="WA", isMT = a.state==="MT", isNV = a.state==="NV", isID = a.state==="ID";
  const isMajor = ["major"].includes(a.pte_co)||["major"].includes(a.pte_nox)||a.hap==="major_source";
  const isMajorHAP = a.hap==="major_source";
  const isNonAtt = !["attainment_all","unknown","maintenance"].includes(a.attainment);
  const isMaintenance = a.attainment==="maintenance";
  const isEmerg = a.operation_type==="emergency";
  const needsTAP = ["above_sqer","unknown"].includes(a.tap);
  const needsMod = isMajor||["psd_ser","major"].includes(a.pte_co)||["psd_ser","major"].includes(a.pte_nox);
  const isGHGRP = ["25k_100k","gt100k"].includes(a.ghg);
  const agN = jcfg.agency||"Agency";

  const regs=[], steps=[], risks=[];

  // FEDERAL NSPS
  if(a.source_type==="combustion_turbine"&&!isEmerg){
    regs.push({id:"kkkka",cat:"Federal – NSPS",code:"40 CFR Part 60, Subpart KKKKa",title:"NSPS for Stationary Combustion Turbines (post Dec 13, 2024)",trigger:"New/modified combustion turbines >10 MMBtu/hr commencing construction after December 13, 2024",req:"NOx: Large (>850 MMBtu/hr) high-util: 9 ppm @ 15% O₂ (DLN+SCR BSER). Medium high-util: 15 ppm. Small/low-util: 25 ppm. SO₂: 0.20 lb/MMBtu (liquid fuel). Initial performance test within 180 days. Annual compliance cert. Applies WA/MT/NV/ID.",cert:"high"});
  }
  if(a.source_type==="rice_si"&&!isEmerg){
    regs.push({id:"jjjj",cat:"Federal – NSPS",code:"40 CFR Part 60, Subpart JJJJ",title:"NSPS for Stationary Spark Ignition ICE",trigger:"New/modified SI stationary engines >19 kW commenced construction after June 12, 2006",req:"Rich-burn ≥100 HP: NOx+NMHC ≤2.0 g/HP-hr; CO ≤4.0 g/HP-hr. Rich-burn ≥500 HP: NOx+NMHC ≤1.0 g/HP-hr; CO ≤2.61 g/HP-hr. Lean-burn ≥500 HP: NOx+NMHC ≤1.5 g/HP-hr. Manufacturer cert or performance test. Annual compliance cert. All four states.",cert:"high"});
  }
  if(a.source_type==="rice_ci"){
    regs.push({id:"iiii",cat:"Federal – NSPS",code:"40 CFR Part 60, Subpart IIII",title:"NSPS for Stationary Compression Ignition ICE",trigger:"New/modified CI stationary engines commenced construction after July 11, 2005",req:"Non-emergency CI RICE: Tier 4 non-road standards (NOx+NMHC: 0.30–0.40 g/kW-hr; PM: 0.02–0.04 g/kW-hr). Requires ULSD (<15 ppm S). Emergency-only: Tier 4 for post-2011 engines; ≤100 hrs/yr non-emergency. All four states.",cert:"high"});
  }
  if(["rice_si","rice_ci"].includes(a.source_type)){
    regs.push({id:"zzzz",cat:"Federal – NESHAP",code:"40 CFR Part 63, Subpart ZZZZ",title:"NESHAP for Stationary RICE",trigger:"All stationary RICE at major and area HAP sources — all four states",req:"New CI RICE at major HAP: CO ≤23 ppmvd @ 15% O₂; HCHO ≤14 ppmvd. 4-stroke lean-burn SI at major HAP: CO ≤225 ppmvd. Rich-burn SI at major HAP: CO ≤47 ppmvd. Area source RICE: biennial oil change + filter inspection work practice. Emergency RICE: ≤100 hrs/yr non-emergency; logbook required.",cert:"high"});
  }
  if(a.source_type==="boiler_large"){
    regs.push({id:"subdb",cat:"Federal – NSPS",code:"40 CFR Part 60, Subpart Db",title:"NSPS for Industrial Boilers >100 MMBtu/hr",trigger:"Steam generating units >100 MMBtu/hr commenced construction after September 18, 1978",req:"NOx: 0.10 lb/MMBtu (nat gas); SO₂: 0.20 lb/MMBtu or 90% reduction; PM: 0.01 lb/MMBtu (gas). CEMS required >250 MMBtu/hr. Performance test within 180 days.",cert:"high"});
    regs.push({id:"ddddd",cat:"Federal – NESHAP",code:"40 CFR Part 63, Subpart DDDDD",title:"NESHAP for Industrial Boilers – Major HAP Sources",trigger:"Major HAP source with industrial boilers or process heaters",req:"HAP limits by fuel type: Hg, HCl, PM. Annual energy assessment. Initial performance test + CEMS or parametric monitoring. 3-year compliance tests. "+(isMajorHAP?"CONFIRMED APPLICABLE.":"Verify HAP PTE for major source status."),cert:isMajorHAP?"high":"medium"});
    regs.push({id:"jjjjjj_b",cat:"Federal – NESHAP",code:"40 CFR Part 63, Subpart JJJJJJ",title:"NESHAP for Area Source Industrial Boilers",trigger:"Area HAP source boilers >10 MMBtu/hr (below major HAP thresholds)",req:"Annual tune-up: adjust combustion air/fuel, inspect fireside, clean heat surfaces, optimize O₂. No HAP emission limits for nat gas area source boilers — work practice only.",cert:isMajorHAP?"low":"high"});
  }
  if(a.source_type==="boiler_small"){
    regs.push({id:"subdc",cat:"Federal – NSPS",code:"40 CFR Part 60, Subpart Dc",title:"NSPS for Small Industrial Boilers 10–100 MMBtu/hr",trigger:"Steam generating units 10–100 MMBtu/hr commenced construction after June 9, 1989",req:"SO₂: 0.50 lb/MMBtu or 90% reduction (coal/oil); nat gas exempt. PM: 0.01 lb/MMBtu (gas). No NOx limit under Subpart Dc. Annual fuel records. All four states.",cert:"high"});
    regs.push({id:"jjjjjj",cat:"Federal – NESHAP",code:"40 CFR Part 63, Subpart JJJJJJ",title:"NESHAP for Area Source Boilers",trigger:"Area source boilers >10 MMBtu/hr nat gas or propane (below major HAP thresholds)",req:"Annual tune-up (biennial for <10 MMBtu/hr). No HAP emission limits for nat gas/propane area source boilers — work practice standard only.",cert:isMajorHAP?"low":"high"});
  }
  if(a.source_type==="fuel_cell"){
    regs.push({id:"fc_nsps",cat:"Federal – NSPS",code:"40 CFR Part 60 – Applicability Screening Required",title:"NSPS Applicability Screening for Fuel Cell Auxiliary Equipment",trigger:"No Subpart directly covers fuel cell stacks — evaluate all auxiliary equipment unit-by-unit in all four states",req:"Reformer → Subpart Db/Dc if steam-generating; KKKK/KKKKa if combustion turbine exhauster. Backup RICE generator → JJJJ (SI) or IIII (CI). Tail gas combustor → evaluate as combustion unit. Document written NSPS applicability determination.",cert:"medium"});
  }
  if(isMajor){
    regs.push({id:"titlev",cat:"Federal – Title V",code:"40 CFR Part 70 / State Title V rules",title:`Title V ${isID?"Tier I":isNV?"Class I AQOP":isMT?"Operating Permit":"Air Operating Permit"} – Major Source`,trigger:"PTE ≥ major source threshold: criteria (100/250 tpy) or HAPs (10 tpy combined / 2.5 tpy single)",req:"Full Title V permit required. Administered by "+agN+". Application due within 12 months of commencing operation. 45-day EPA review required. 5-year permit term. Annual compliance certification. Semi-annual monitoring deviation reports.",cert:"high"});
    regs.push({id:"psd",cat:"Federal – PSD / NSR",code:"40 CFR §52.21 / State PSD rules",title:"Prevention of Significant Deterioration (PSD) Pre-Construction Permit",trigger:"New major stationary source or major modification in attainment area exceeding PSD significant emission rates",req:"Top-down BACT/"+(isNV&&!isMajor?"BSC":"BACT")+"; pre-construction NAAQS impact analysis (AERMOD); Class I area analysis if within 100 km; 30-day public comment; 45-day EPA review. "+jcfg.psd_note,cert:"high"});
  }
  if(isNonAtt&&isMajor){
    const isClarkNV = a.jurisdiction==="nv_clark";
    regs.push({id:"nnsr",cat:"Federal – Nonattainment NSR",code:"40 CFR Part 51 / State NSR rules",title:"Nonattainment New Source Review (NNSR) – LAER + Emission Offsets",trigger:"New major source in nonattainment area for "+a.attainment.replace("nonattainment_",""),req:"LAER (no cost consideration — most stringent achieved nationally). Emission offsets at ratio ≥1.15:1 (ozone) or 1.1:1 (other pollutants). Alternative site analysis. "+(isClarkNV?"Las Vegas Valley is SERIOUS OZONE NONATTAINMENT (reclassified Jan 21, 2025). Major sources with NOx ≥100 tpy or VOC ≥100 tpy require LAER and emission offsets. NNSR administered by Clark County DAQ.":isID?"Pocatello (Bannock County): PM2.5 nonattainment — verify if project site is within nonattainment boundary.":isWA&&a.jurisdiction==="swcaa"?"Clark County WA is a maintenance plan AREA (not nonattainment) — NNSR with LAER/offsets does NOT apply, but SWCAA 400-111 maintenance plan BACT requirements DO apply.":"Verify current nonattainment designation at exact project site with state agency. Offset markets in Intermountain West are thin — begin procurement early."),cert:"high"});
  }
  if(isMaintenance&&a.jurisdiction==="swcaa"){
    regs.push({id:"maint_plan",cat:"Local – SWCAA – Maintenance Plan",code:"SWCAA 400-111",title:"Portland-Vancouver Ozone Maintenance Plan Area Requirements",trigger:"Any new source or modification in Clark County SWCAA jurisdiction within the Portland-Vancouver ozone maintenance plan area",req:"SWCAA 400-111 requires: (1) BACT must be employed for ALL air contaminants emitted by the proposed source/modification; (2) emissions minimized such that the new source will not exceed emission levels inconsistent with maintenance plan goals; (3) no ambient air quality standard violations. This is MORE stringent than standard NSR — BACT applies regardless of emission magnitude. Also applies to major sources subject to standard NNSR.",cert:"high"});
  }

  // STATE/LOCAL NSR
  regs.push({id:"local_nsr",
    cat: isWA?"Local – "+agN+" – New Source Review":isMT?"State – Montana DEQ – New Source Review":isNV?"Local – "+agN+" – New Source Review":"State – Idaho DEQ – New Source Review",
    code:jcfg.rule_basis,title:jcfg.permit_name+" – New Source Review",
    trigger:"New emission source or modification above de minimis thresholds",
    req:jcfg.nsr_note+" Completeness: "+jcfg.completeness_days+" days. Final determination: "+jcfg.final_days+" days from completeness. Public notice: "+jcfg.public_notice+". Fee: "+jcfg.fee_note+" | PSD: "+jcfg.psd_note,
    cert:"high"});

  // STATE TAP
  const tapCat = isWA?"WA State – Toxic Air Pollutants":isMT?"Montana – AAQS Compliance":isNV?"Nevada – Environmental Evaluation (AERMOD Required)":"Idaho – Toxic Air Pollutant Standards (EL/AAC)";
  regs.push({id:"tap_state",cat:tapCat,code:jcfg.toxic_rule,
    title:isWA?"WAC 173-460 Toxic Air Pollutant Standards":isMT?"ARM 17.8.900 Montana AAQS Compliance Demonstration":isNV?"NAC 445B Environmental Evaluation — AERMOD Mandatory for ALL Sources":"IDAPA 58.01.01 Section 580 — Toxic Air Pollutant Standards (EL/AAC + AERMOD)",
    trigger:isWA?"Any emission unit emitting WAC 173-460-150 listed TAPs above SQER/ASIL":isMT?"All new/modified sources must demonstrate ARM 17.8.900 AAQS compliance":isNV?"ALL new and modified sources must complete environmental evaluation with AERMOD (NAC 445B.308/311)":"Emissions above IDAPA 58.01.01 Section 580 Screening Emission Level (EL, carcinogens) or Acceptable Ambient Concentration (AAC, non-carcinogens)",
    req:isWA?"Step 1: Screen all emissions vs WAC 173-460-150 SQER/ASIL table. Step 2 (if exceeded): T-BACT analysis. Step 3 (T-BACT insufficient): AERMOD second-tier health risk analysis. "+(a.jurisdiction==="pscaa"?"PSCAA Reg 3 Art 2 Sec 2.05 ALSO requires AERMOD when ASIL exceeded. Both WAC 173-460 and Reg 3 Art 2 must be satisfied.":" Key combustion TAPs: formaldehyde (SQER 0.4 tpy), acetaldehyde (0.8 tpy), benzene (0.1 tpy).")+(a.jurisdiction==="swcaa"?" SWCAA 400-040 additionally requires no WAC 173-476 ambient standard violations. SWCAA 400-111 (Clark County) requires BACT for ALL criteria pollutants.":""):isMT?"Demonstrate compliance with ARM 17.8.900 AAQS via AERMOD for all criteria pollutants. No SQER-based TAP program. Near Class I areas (Glacier NP, Bob Marshall, Selway-Bitterroot): CALPUFF far-field visibility modeling + AQRV analysis required. Coordinate with Federal Land Managers (NPS/USFS) who have independent 30-day review authority.":isNV?"Environmental evaluation MANDATORY for ALL new/modified sources per NAC 445B.308/311 — no minimum emission threshold. Submit modeling protocol to "+agN+" and receive written approval BEFORE AQOP application. AERMOD analysis demonstrating compliance with Nevada AAQS (mirror NAAQS). Class I area analysis if within 100 km. No separate T-BACT or second-tier health risk analysis framework — AAQS compliance IS the standard.":"Step 1: Screen TAP emissions against IDAPA 58.01.01 Section 580 EL (carcinogenic TAPs) and AAC (non-carcinogenic TAPs). Step 2 (if EL/AAC exceeded): AERMOD dispersion modeling demonstrating ambient concentrations below acceptable limits. Submit modeling protocol to Idaho DEQ ≥1 month before PTC application — MANDATORY prerequisite. Idaho EL/AAC thresholds differ numerically from WA SQER/ASIL but serve the same protective function.",
    cert:needsTAP?"high":"medium"});

  // GHG
  if(["10k_25k","25k_100k","gt100k"].includes(a.ghg)&&isWA){
    regs.push({id:"wa_ghg",cat:"WA State – GHG Reporting",code:"WAC 173-441",title:"Washington GHG Reporting Rule",trigger:"WA facility with covered operations emitting ≥10,000 MT CO₂e/yr",req:"Annual GHG report to Ecology by March 31. Use 40 CFR Part 98 methods. Third-party verification if ≥25,000 MT CO₂e. Submit via Ecology SAW portal.",cert:"high"});
  }
  if(isGHGRP){
    regs.push({id:"ghgrp",cat:"Federal – GHG Reporting",code:"40 CFR Part 98",title:"EPA Greenhouse Gas Reporting Program (GHGRP)",trigger:"Facility emitting ≥25,000 MT CO₂e/yr from covered source categories",req:"Annual report to EPA via e-GGRT by March 31 for prior calendar year. Subpart C (stationary fuel combustion). Applies in all four states: WA, MT, NV, ID. Designate Designated Representative (DR) in e-GGRT. Retain records ≥3 years.",cert:"high"});
  }
  if(a.ghg==="gt100k"&&isWA){
    regs.push({id:"cap",cat:"WA State – Cap-and-Invest",code:"WAC 173-446 (Climate Commitment Act)",title:"Washington Cap-and-Invest Program – Covered Entity",trigger:"Covered operations emitting ≥25,000 MT CO₂e/yr",req:"Register with Ecology as covered entity. Annual GHG report per WAC 173-441. Surrender allowances ≥ covered emissions by November 1 each year. Procure allowances via WACA auctions or secondary market. Maintain CITSS account. NOTE: Montana, Nevada, and Idaho have NO state GHG cap-and-invest program.",cert:"high"});
  }
  if(!isMajor){
    regs.push({id:"local_reg",
      cat:isWA?"Local – "+agN+" – Registration":isMT?"State – Montana DEQ – Registration":isNV?"Local – "+agN+" – Registration":"State – Idaho DEQ – Registration",
      code:isWA?(agN.includes("NWCAA")?"NWCAA Section 320":agN.includes("PSCAA")?"PSCAA Regulation I":agN.includes("SWCAA")?"SWCAA 400-100":"WAC 173-400"):isMT?"ARM 17.8.505":isNV?"NAC 445B Class I/II AQOP":isID?"IDAPA 58.01.02 Tier I/II":"State operating permit",
      title:"Source Registration / Annual Operating Permit & Emissions Reporting",
      trigger:"All non-major sources of air pollution operating in jurisdiction",
      req:jcfg.registration,cert:"high"});
  }

  // STEPS
  steps.push({phase:"Pre-Application",n:1,title:"Project Scoping & Pre-Application Meeting",dur:"2–6 weeks",crit:true,
    desc:"Schedule a pre-application meeting with "+agN+" "+jcfg.phone+". "+(isWA?"For PSD-triggering projects also contact WA Ecology (360-407-6800) separately.":isMT?"Confirm if county program has overlapping jurisdiction — get determination in writing.":isNV&&a.jurisdiction==="nv_clark"?"CRITICAL: Confirm Clark County DAQ vs NDEP jurisdiction for your source type before any pre-application work.":isID?"Contact Idaho DEQ Permit Hotline (1-877-573-7648). For projects needing modeling: begin developing air quality modeling protocol — must be submitted ≥1 month before PTC application.":" Contact agency for pre-application guidance.")+" Bring: equipment list with specs, process flow diagram, fuel data, rough emissions estimates.",
    owner:"Applicant + "+agN+(isMajor&&isWA?" + WA Ecology":""),
    tip:"Pre-application meetings are free and non-binding. Dramatically reduce incomplete application notices."});

  steps.push({phase:"Pre-Application",n:2,title:"PTE Calculations – All Criteria Pollutants, HAPs, TAPs, GHGs",dur:"3–8 weeks",crit:true,
    desc:"Calculate PTE at maximum design capacity (8,760 hr/yr, worst-case fuel) for: CO, NOₓ, PM2.5, PM10, SO₂, VOC/ozone precursors, Lead, total HAPs, individual HAPs, TAPs (state-specific), and GHGs (CO₂e). Apply agency-specific thresholds: "+agN+" thresholds: "+(jcfg.nsr_thresholds?.CO?`CO: ${jcfg.nsr_thresholds.CO} tpy, NOₓ: ${jcfg.nsr_thresholds.NOx} tpy, PM2.5: ${jcfg.nsr_thresholds.PM25} tpy, SO₂: ${jcfg.nsr_thresholds.SO2} tpy, VOC: ${jcfg.nsr_thresholds.VOC} tpy, Lead: ${jcfg.nsr_thresholds.Lead} tpy`:"any emission triggers permit requirement"),
    owner:"Applicant / Environmental Consultant",
    tip:"Only federally enforceable permit conditions (with monitoring) can reduce PTE below physical design capacity. Underestimating PTE is the most common and costly permitting error."});

  steps.push({phase:"Pre-Application",n:3,title:"NSR / Permit Applicability Determination",dur:"1–3 weeks",crit:true,
    desc:jcfg.nsr_note+" Compare PTE to PSD major source thresholds (250/100 tpy criteria; 10/2.5 tpy HAPs). Aggregate all emission units sharing the same 2-digit SIC code on contiguous property.",
    owner:"Applicant / Environmental Consultant",
    tip:"Single-pollutant threshold analysis is insufficient for NWCAA — ALL pollutants must be below ALL thresholds simultaneously to avoid NOC. PSCAA/SWCAA: any emission increase triggers permit."});

  let sn = 4;
  if(!isEmerg){
    if(isWA) steps.push({phase:"Permit Application",n:sn++,title:"SEPA Environmental Checklist",dur:"2–4 weeks",crit:true,
      desc:"Complete SEPA checklist per WAC 197-11. "+agN+" acts as SEPA lead agency. Threshold determination: DNS, MDNS (with mitigation), or EIS (rare — adds 6–18 months). Must be completed before agency completeness determination.",
      owner:"Applicant (checklist); "+agN+" (SEPA lead determination)",
      tip:"Complete thoroughly and conservatively. MDNS with conditions is the fastest realistic pathway. Address GHG emissions explicitly in section B.1 (Air)."});

    steps.push({phase:"Permit Application",n:sn++,title:"BACT / BSC Analysis – Top-Down Methodology",dur:"4–10 weeks",crit:true,
      desc:"Conduct top-down "+(isNV&&!isMajor?"Best System of Control (BSC)":"BACT")+" analysis for all pollutants triggering NSR. Steps: (1) Identify all technically feasible controls; (2) Eliminate technically infeasible options; (3) Rank by effectiveness; (4) Evaluate most stringent for cost/energy/environmental impacts; (5) Select BACT/BSC. Reference EPA RBLC (rblc.epa.gov). BACT/BSC must equal or exceed applicable NSPS. "+(a.jurisdiction==="swcaa"?"SWCAA 400-111 (Clark County): BACT required for ALL air contaminants regardless of emission level — not just those above NSR thresholds.":""),
      owner:"Applicant / Environmental Consultant",
      tip:"Search RBLC by SCC code, pollutant, and state. For novel sources (fuel cells), document the analogy approach explicitly. BACT/BSC cannot be less stringent than applicable NSPS floor."});

    steps.push({phase:"Permit Application",n:sn++,
      title:isWA?"TAP/Toxic Screening & T-BACT / AERMOD Analysis":isMT?"Montana AAQS Compliance Demonstration (AERMOD)":isNV?"Environmental Evaluation — AERMOD Modeling (MANDATORY for all NV sources)":"Idaho TAP Screening (EL/AAC) & AERMOD Protocol",
      dur:"3–8 weeks",crit:needsTAP,
      desc:isWA?"Screen all emission streams against WAC 173-460-150 SQER/ASIL table. If any TAP exceeds SQER/ASIL: T-BACT analysis. If T-BACT insufficient: AERMOD second-tier health risk analysis. "+(a.jurisdiction==="pscaa"?"PSCAA Regulation 3, Article 2, Section 2.05 ADDITIONALLY requires AERMOD when ASIL exceeded — both frameworks apply simultaneously.":a.jurisdiction==="swcaa"?"SWCAA 400-040 also requires no WAC 173-476 AAQS violations. SWCAA 400-111 (Clark County) requires BACT for ALL criteria pollutants in maintenance plan area.":"Key combustion TAPs: formaldehyde (SQER 0.4 tpy), acetaldehyde (0.8 tpy), benzene (0.1 tpy), acrolein."):isMT?"Demonstrate compliance with ARM 17.8.900 AAQS via AERMOD for all criteria pollutants. No SQER step. Near Class I areas (Glacier, Bob Marshall, Selway-Bitterroot): CALPUFF visibility modeling + AQRV analysis required. Coordinate with Federal Land Managers before application.":isNV?"MANDATORY: Environmental evaluation (AERMOD) required for ALL new/modified "+agN+" sources per NAC 445B.308/311. Submit modeling protocol to "+agN+" and receive written approval BEFORE AQOP application. Demonstrate Nevada AAQS compliance for all criteria pollutants. No separate T-BACT or second-tier health risk analysis — AAQS compliance IS the standard.":"Step 1: Screen emissions against IDAPA 58.01.01 Section 580 EL (carcinogens) and AAC (non-carcinogens). Step 2 (if EL/AAC exceeded): AERMOD ambient modeling demonstrating compliance. Submit AERMOD modeling protocol to Idaho DEQ at least 1 month before PTC application — MANDATORY prerequisite that cannot be skipped.",
      owner:"Applicant / Environmental Consultant / Air Toxics Specialist",
      tip:isWA?"Formaldehyde from natural gas combustion consistently drives second-tier TAP analysis. Use source test data rather than AP-42 defaults — test data gives lower emission rates.":isMT?"Begin FLM coordination early — NPS and USFS have 30-day independent review authority on PSD permits near Class I areas.":isNV?"Submit modeling protocol to "+agN+" before application — BAPC/DAQ/NNPH will review and may require changes before approving. This step cannot be done concurrently with the application.":"Submit the AERMOD modeling protocol to Idaho DEQ at least 6 weeks before planned PTC application submittal (1 month is regulatory minimum but DEQ review takes time)."});

    if(needsMod||isNV){
      steps.push({phase:"Permit Application",n:sn++,title:"AERMOD Air Dispersion Modeling – Criteria Pollutant NAAQS Compliance",dur:"6–14 weeks",crit:true,
        desc:"Conduct AERMOD dispersion modeling per 40 CFR Part 51 Appendix W (revised Nov 2024, effective Jan 28, 2025 with 1-year transition). Demonstrate no NAAQS violation and no PSD increment exceedance. Add background concentrations from nearest EPA/agency ambient monitor. "+jcfg.modeling_met,
        owner:"Applicant / Certified Air Modeler",
        tip:isWA?"PM2.5 annual NAAQS = 9.0 µg/m³ (revised Feb 2024) — elevated background PM2.5 may limit available increment. Appendix W revised Nov 2024; confirm agency has adopted new version.":isMT?"CALPUFF required for Class I area sources in addition to AERMOD NAAQS analysis. Submit protocol to MT DEQ before beginning modeling.":isNV?"NDEP/Clark/NNPH require protocol approval before application. Confirm agency preference for Appendix W version (2024 vs 2017 — 1-year transition period applies).":"Idaho DEQ requires modeling protocol ≥1 month before PTC — non-negotiable. Confirm protocol includes met data selection and receptor grid."});
    }

    steps.push({phase:"Permit Application",n:sn++,title:agN+" Permit Application Submittal",dur:"1–2 weeks",crit:true,
      desc:"Submit complete application to "+agN+": application form + equipment supplementals + BACT/BSC analysis + emissions calculations (all pollutants) + "+(isWA?"SEPA determination + ":"")+"environmental evaluation/modeling results + filing fee. "+(isNV?"Note: modeling protocol approval must be obtained BEFORE this submittal.":isID?"Note: modeling protocol approval from Idaho DEQ must be obtained BEFORE this submittal.":""),
      owner:"Applicant",
      tip:"Request informal pre-submittal review from the agency permit engineer 2 weeks before formal submittal — most agencies will flag missing items before the clock starts."});

    steps.push({phase:"Agency Review",n:sn++,title:"Agency Completeness Review ("+jcfg.completeness_days+" days)",dur:jcfg.completeness_days+" calendar days",crit:true,
      desc:"Agency has "+jcfg.completeness_days+" calendar days to determine completeness or notify of deficiencies. If incomplete: must resubmit — clock restarts.",
      owner:agN+" Permit Engineer",
      tip:"Respond immediately to agency supplemental information requests. Your response time is not regulated — delays pause the permit clock."});

    steps.push({phase:"Agency Review",n:sn++,title:"Technical Review & Preliminary Determination",dur:jcfg.final_days+"–90 days from completeness",crit:true,
      desc:"Agency reviews all technical submittals and issues preliminary determination to approve or deny with conditions. "+agN+" posts preliminary determination for public notice period.",
      owner:agN+" Engineering Staff",
      tip:"Stay available for technical questions. For novel source types (fuel cells), proactively schedule a technical call with the permit engineer to walk through BACT methodology."});

    steps.push({phase:"Public Process",n:sn++,title:"Public Notice & Comment Period",dur:isMajor?"30–45 days (mandatory)":"15–30 days",crit:isMajor,
      desc:jcfg.public_notice+". For PSD permits: mandatory 30-day public comment + 45-day EPA review.",
      owner:agN+" (issues notice); Applicant (responds to comments)",
      tip:"Engage stakeholders before formal comment period. Tribal communities in MT and ID have specific rights to participate in PSD and Title V proceedings — engage tribal environmental programs early."});

    steps.push({phase:"Agency Review",n:sn++,title:jcfg.permit_name+" Issuance",dur:"Per regulatory clock",crit:true,
      desc:agN+" issues final "+jcfg.permit_name+". Contains: emission limits, operational restrictions, monitoring and recordkeeping requirements, compliance testing schedule. CONSTRUCTION CANNOT BEGIN until permit is in hand.",
      owner:agN,
      tip:"Review all permit conditions carefully. Build a compliance calendar mapping every condition to equipment and operating procedures before beginning construction."});
  }

  if(isMajor){
    steps.push({phase:"PSD / Title V",n:sn++,title:"PSD Permit – "+(isWA?"WA Ecology (parallel track — do NOT wait for NOC)":isMT?"Montana DEQ (parallel track)":isNV?agN+" (parallel track)":"Idaho DEQ (parallel track)"),dur:"12–24 months",crit:true,
      desc:isWA?"Ecology retains PSD jurisdiction statewide. Submit PSD application to Ecology Air Quality Program (360-407-6800) simultaneously with local NOC — NOT sequentially. PSD BACT is separate from and more rigorous than NOC BACT.":isMT?"Montana DEQ is the PSD authority. Requires top-down BACT, full AERMOD, Class I area analysis (Glacier, Bob Marshall, Selway-Bitterroot), 30-day public comment, 45-day EPA Region 8 review.":isNV?agN+" is the PSD authority. PSD integrated into Class I AQOP process. Requires top-down BACT, full AERMOD, Class I area analysis, 30-day public comment, 45-day EPA Region 9 review.":"Idaho DEQ is the PSD authority. PSD integrated into PTC process. Requires top-down BACT, full AERMOD, Class I area analysis (Frank Church, Sawtooth, Selway-Bitterroot), 30-day public comment, 45-day EPA Region 10 review.",
      owner:"Applicant + "+(isWA?"WA Dept. of Ecology":isMT?"Montana DEQ AQB":isNV?agN:"Idaho DEQ Air Quality Division"),
      tip:"Lock in facility design before PSD application — material changes require amendment and restart the review clock. Budget $150K–$500K+ for PSD technical support."});
    steps.push({phase:"PSD / Title V",n:sn++,title:"Title V / "+(isID?"Tier I":isNV?"Class I AQOP":isMT?"Operating Permit":"AOP")+" Application & Issuance",dur:"12–18 months to issuance",crit:true,
      desc:"Submit within 12 months of commencing operation. Consolidates all applicable requirements (NSPS, NESHAP, PSD, NSR, state rules). 45-day EPA review required. 5-year permit term. Annual compliance certification.",
      owner:"Applicant + "+agN+" AOP/Operating Permit Staff",
      tip:"Integrate all construction permit and PSD conditions into the Title V application from day one. Build compliance tracking before first annual certification is due."});
  }

  steps.push({phase:"Post-Construction",n:sn++,title:"Initial Stack / Performance Testing – All Regulated Pollutants",dur:"1–3 days on-site; 4–8 weeks planning + report",crit:true,
    desc:"Conduct initial performance tests per EPA Reference Methods (40 CFR Part 60 Appendix A) within timeframe specified in permit (typically 60–180 days after startup). Test: CO, NOₓ, PM (filterable + condensable), SO₂, VOC, formaldehyde (HAP/TAP), and additional HAPs as required. Notify "+agN+" at least 30 days before test date.",
    owner:"Applicant + Certified Stack Test Contractor",
    tip:"Operate at ≥90% of maximum rated capacity during testing. Hire a stack tester familiar with specific state agency protocols — report format expectations vary between WA, MT, NV, and ID."});

  steps.push({phase:"Post-Construction",n:sn++,title:agN+" Registration / Operating Permit & Annual Compliance Program",dur:"2–4 weeks setup; then annual",crit:!isMajor,
    desc:jcfg.registration+" Establish: monitoring systems, fuel consumption logs, annual emissions calculation methodology.",
    owner:"Applicant / Facility Environmental Manager",
    tip:isWA?"Annual inventory due "+(a.jurisdiction==="swcaa"?"January 31":"April 15")+". Build compliance calendar integrating all test, report, and inspection deadlines.":isMT?"Annual emissions inventory to Montana DEQ; operating fees per ARM 17.8.505.":isNV?"Annual compliance certification and monitoring reports to "+agN+". Class I: semi-annual deviation reports.":"Annual emissions inventory to Idaho DEQ. Tier I: semi-annual + annual monitoring reports; annual compliance certification."});

  if(isGHGRP) steps.push({phase:"Ongoing Compliance",n:sn++,title:"EPA GHGRP Annual GHG Report – Due March 31 (40 CFR Part 98)",dur:"Annual obligation",crit:true,
    desc:"Submit annual GHG report via EPA e-GGRT by March 31 for prior calendar year. Subpart C (stationary fuel combustion). Applies in all four states: WA, MT, NV, ID. Designate Designated Representative (DR) in e-GGRT.",
    owner:"Applicant / GHG Program Manager",
    tip:"Establish real-time fuel tracking before startup. Missing March 31 deadline triggers automatic EPA enforcement in all four states."});

  if(a.ghg==="gt100k"&&isWA) steps.push({phase:"Ongoing Compliance",n:sn++,title:"WA Cap-and-Invest – Annual Allowance Surrender (November 1 Deadline)",dur:"Annual obligation",crit:true,
    desc:"Register with Ecology as covered entity (WAC 173-446). Annual GHG verification report. Surrender allowances by November 1. Procure via WACA auctions or secondary market. MT, NV, and ID have NO state cap-and-invest program.",
    owner:"Applicant + Ecology CCA team + Carbon Markets Advisor",
    tip:"Develop multi-year allowance procurement strategy. Model carbon price scenarios ($20–$100+/MT). MT/NV/ID facilities pay only GHGRP reporting costs — no allowance obligation."});

  // RISKS
  if(a.source_type==="fuel_cell") risks.push({cat:"Regulatory Novelty",sev:"high",title:"Undefined BACT/BSC Precedent for Fuel Cells in All Four States",desc:"Fuel cells have minimal RBLC entries. All four state agencies may default to combustion source limits that may be infeasible for electrochemical technology.",mit:"Gather manufacturer guaranteed emission rates with supporting test data; propose technology-specific limits; request pre-application alignment meeting; document analogy methodology explicitly."});
  if(isMajor) risks.push({cat:"Timeline",sev:"high",title:"PSD Permitting: 12–24 Month Timeline in All Four States",desc:"PSD permitting takes 12–24+ months. "+(isWA?"WA Ecology PSD is SEPARATE from local NOC — must run in parallel.":isMT?"MT DEQ integrated PSD but still 12–18 months.":isNV?"NV agency PSD integrated into Class I AQOP.":"ID DEQ integrated PSD into PTC.")+". Sequential processing adds 12–18 months to total timeline.",mit:"Lock in facility design before PSD application. Run PSD and construction permit tracks in parallel — never sequentially. Engage PSD authority early."});
  if(isNV&&a.jurisdiction==="nv_clark") risks.push({cat:"State-Specific – Nevada",sev:"high",title:"Las Vegas Valley SERIOUS OZONE NONATTAINMENT (Effective Jan 21, 2025)",desc:"Las Vegas Valley was reclassified from marginal to SERIOUS ozone nonattainment effective January 21, 2025 (89 FR 103657), with attainment deadline of August 3, 2027. Major sources with NOx ≥100 tpy or VOC ≥100 tpy are subject to LAER (not just BACT) and emission offsets at 1.15:1 ratio. Ozone precursor (NOx/VOC) emissions are highly scrutinized by Clark County DAQ.",mit:"Quantify NOx and VOC PTE carefully. If below 100 tpy, document synthetic minor status with enforceable permit limits. If ≥100 tpy: engage Clark County DAQ for NNSR pre-application meeting; begin offset market research — NV ERC market is thin."});
  if(isMT) risks.push({cat:"State-Specific – Montana",sev:"medium",title:"Class I Area Visibility Modeling (CALPUFF) — Montana",desc:"Montana has major Class I areas (Glacier NP, Bob Marshall, Selway-Bitterroot). Major sources within ~100 km must conduct far-field CALPUFF visibility modeling and demonstrate no adverse Air Quality Related Value (AQRV) impacts. Federal Land Managers have independent 30-day review authority.",mit:"Identify proximity to Class I areas early. Engage Montana DEQ and Federal Land Managers (NPS/USFS) before beginning PSD process. CALPUFF modeling is technically complex — allow 3–4 extra months for Class I area analysis."});
  if(isNV) risks.push({cat:"State-Specific – Nevada",sev:"medium",title:"Nevada Three-Agency Jurisdiction — Wrong Agency Risk",desc:"Nevada air permitting is split among NDEP BAPC, Clark County DAQ, and NNPH AQMD with different forms, fees, and requirements. NDEP retains jurisdiction for fossil-fuel power plants ≥25 MW in Clark and Washoe Counties.",mit:"Confirm the correct permitting authority before ANY pre-application work. For power generation in Clark or Washoe Counties: contact NDEP BAPC directly to confirm jurisdiction before filing with county agency."});
  if(isNV) risks.push({cat:"State-Specific – Nevada",sev:"medium",title:"Nevada MANDATORY Modeling for ALL Sources — Protocol Required Before Application",desc:"Unlike WA (TAP-triggered) or ID (when approaching NAAQS), Nevada requires AERMOD environmental evaluation for ALL new/modified sources. Submitting an AQOP application without prior modeling protocol approval from the agency will result in incompleteness.",mit:"Submit modeling protocol to the applicable Nevada agency and receive written approval before beginning AQOP application preparation. Allow 4–8 weeks for protocol review and approval."});
  if(isID) risks.push({cat:"State-Specific – Idaho",sev:"medium",title:"Idaho Mandatory Modeling Protocol Lead Time Requirement",desc:"Idaho DEQ requires a modeling protocol to be submitted and written approval received before the PTC application can be submitted. This is a hard prerequisite — submitting without it makes the application incomplete.",mit:"Submit AERMOD modeling protocol to Idaho DEQ at least 6 weeks before planned PTC application submittal (1 month is regulatory minimum; DEQ review takes additional time)."});
  if(isNonAtt&&isMajor) risks.push({cat:"Regulatory",sev:"high",title:"NNSR: LAER and Emission Offsets Required",desc:"Nonattainment designation triggers LAER (no cost consideration) and emission offsets. ERC/offset markets in the Intermountain West are thin — offsets may be expensive or unavailable.",mit:"Verify nonattainment designation at exact project location. Evaluate alternative attainment sites. Begin offset procurement immediately if nonattainment is confirmed — engage an ERC broker experienced in the specific state's market."});
  if(isMaintenance&&a.jurisdiction==="swcaa") risks.push({cat:"State-Specific – SWCAA",sev:"medium",title:"SWCAA 400-111 Maintenance Plan Area — BACT for ALL Criteria Pollutants",desc:"Clark County is in the Portland-Vancouver ozone maintenance plan area. SWCAA 400-111 requires BACT for ALL air contaminants emitted by any new source — even those with emissions well below NSR thresholds. This is more stringent than standard WAC 173-400 NSR.",mit:"Document BACT analysis for all criteria pollutants emitted at the facility, not just those exceeding NSR thresholds. Engage SWCAA early to confirm the full scope of the 400-111 analysis expected."});
  if(needsTAP) risks.push({cat:"Regulatory",sev:"medium",title:isWA?"WA TAP Second-Tier AERMOD Analysis Risk":isID?"Idaho TAP AERMOD Modeling Failure":"State Toxic Air Analysis Risk",desc:isWA?"WAC 173-460: if T-BACT cannot reduce all TAP impacts below SQER/ASIL thresholds, second-tier AERMOD health risk analysis is required. Formaldehyde from natural gas combustion is almost always the driver.":isID?"IDAPA Section 580: if AERMOD-modeled concentrations exceed EL (carcinogens) or AAC (non-carcinogens), permit may be conditioned or denied.":"State toxic/hazardous air analysis may result in restrictive permit conditions.",mit:isWA?"Conduct TAP screening early. Use source test data for formaldehyde (lower than AP-42 defaults). Engage health risk assessment professional familiar with agency risk guidance.":isID?"Submit modeling protocol early. Use source test data for formaldehyde. Pre-screen using Idaho DEQ's TAP assessment tools before formal application.":"Engage state agency early to understand toxic air analysis requirements and screening tools."});
  if(a.ej_sensitive==="high") risks.push({cat:"Community / EJ",sev:"high",title:"Environmental Justice Community Opposition Risk",desc:"Facilities near EJ communities face elevated agency scrutiny, extended public comment periods, and organized opposition in all four states.",mit:"Conduct proactive community engagement before permit submittal. Prepare a community benefits plan. Engage tribal environmental programs early in MT and ID."});
  if(a.ghg==="gt100k"&&isWA) risks.push({cat:"Financial",sev:"high",title:"WA Cap-and-Invest Allowance Cost (WA only — MT/NV/ID not affected)",desc:"WA carbon prices ranged $20–$65+/MT at WACA auctions. At 100,000 MT/yr: $2M–$6.5M+ annually. MT, NV, and ID have NO state cap-and-invest.",mit:"Model carbon price scenarios. Develop multi-year procurement strategy. Note: MT/NV/ID facilities pay only GHGRP reporting costs — no allowance obligation."});
  risks.push({cat:"Process",sev:"low",title:"BACT/BSC Documentation Rigor Varies by State",desc:"All four states require top-down BACT or BSC analysis. WA agencies (especially PSCAA) have among the most rigorous review. NDEP, Montana DEQ, and Idaho DEQ typically accept thorough RBLC-based analyses.",mit:"Build thorough top-down BACT analysis regardless of state. Over-documentation is never a problem. Reference comparable recent permits from within the same state where possible."});

  return {regs,steps,risks};
}

// ─── CARD COMPONENTS ──────────────────────────────────────────────────────────
function RegCard({reg}){
  const[o,setO]=useState(false);
  const c=cc(reg.cat);
  const cm={high:{c:"#1e8449",l:"Confirmed"},medium:{c:"#d68910",l:"Likely"},low:{c:"#888",l:"Conditional"}};
  const ct=cm[reg.cert]||cm.medium;
  return(
    <div style={{border:`1px solid ${c}22`,borderLeft:`4px solid ${c}`,borderRadius:8,background:"#fff",marginBottom:9,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
      <div onClick={()=>setO(!o)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:9,color:c,marginBottom:2,letterSpacing:1,wordBreak:"break-word"}}>{reg.cat.toUpperCase()}</div>
          <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:1,wordBreak:"break-word"}}>{reg.code}</div>
          <div style={{fontSize:12,color:"#444",wordBreak:"break-word"}}>{reg.title}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0,marginLeft:6}}>
          <div style={{fontSize:9,color:ct.c,fontWeight:700,background:ct.c+"18",padding:"2px 6px",borderRadius:3,whiteSpace:"nowrap"}}>{ct.l}</div>
          <span style={{fontSize:11,color:"#bbb"}}>{o?"▲":"▼"}</span>
        </div>
      </div>
      {o&&(
        <div style={{padding:"0 14px 13px",borderTop:"1px solid #f0f4f8"}}>
          <div style={{fontSize:9,color:"#888",letterSpacing:1,marginBottom:3}}>TRIGGER</div>
          <div style={{fontSize:12,color:"#222",background:"#f8fafc",padding:"7px 10px",borderRadius:5,borderLeft:`3px solid ${c}`,marginBottom:9,lineHeight:1.6}}>{reg.trigger}</div>
          <div style={{fontSize:9,color:"#888",letterSpacing:1,marginBottom:3}}>REQUIREMENTS</div>
          <div style={{fontSize:12,color:"#222",lineHeight:1.65}}>{reg.req}</div>
        </div>
      )}
    </div>
  );
}

function StepCard({step}){
  const[o,setO]=useState(false);
  const pc=PC[step.phase]||"#444";
  return(
    <div style={{display:"flex",gap:0,marginBottom:7}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:34,flexShrink:0}}>
        <div style={{width:26,height:26,borderRadius:"50%",background:step.crit?pc:"#ccc",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{step.n}</div>
        <div style={{width:2,flex:1,background:"#e4e8ef",marginTop:3}}/>
      </div>
      <div style={{flex:1,marginLeft:8,border:"1px solid #e4e8ef",borderRadius:8,background:"#fff",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
        <div onClick={()=>setO(!o)} style={{padding:"10px 12px",cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2,gap:6}}>
            <span style={{fontSize:9,color:pc,letterSpacing:1,fontWeight:700,flexShrink:0}}>{step.phase}</span>
            <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
              {step.crit&&<span style={{fontSize:8,background:pc+"18",color:pc,borderRadius:3,padding:"1px 5px",fontWeight:700,whiteSpace:"nowrap"}}>CRITICAL</span>}
              <span style={{fontSize:11,color:"#bbb"}}>{o?"▲":"▼"}</span>
            </div>
          </div>
          <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:2,lineHeight:1.4}}>{step.title}</div>
          <div style={{fontSize:10,color:"#888"}}>⏱ {step.dur}</div>
        </div>
        {o&&(
          <div style={{padding:"0 12px 12px",borderTop:"1px solid #f0f4f8"}}>
            <div style={{fontSize:12,color:"#222",lineHeight:1.65,marginBottom:8}}>{step.desc}</div>
            <div style={{fontSize:9,color:"#888",letterSpacing:1,marginBottom:2}}>OWNER</div>
            <div style={{fontSize:11,color:"#444",marginBottom:8}}>{step.owner}</div>
            <div style={{background:"#fffbee",border:"1px solid #e8d88a",borderRadius:6,padding:"8px 10px"}}>
              <div style={{fontSize:9,color:"#8a7020",letterSpacing:1,marginBottom:3}}>💡 PRACTITIONER TIP</div>
              <div style={{fontSize:11,color:"#5a4a10",lineHeight:1.65}}>{step.tip}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RiskCard({risk}){
  const[o,setO]=useState(false);
  const cfg=SEV[risk.sev];
  return(
    <div style={{border:`1px solid ${cfg.c}33`,borderLeft:`4px solid ${cfg.c}`,borderRadius:8,background:"#fff",marginBottom:7,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
      <div onClick={()=>setO(!o)} style={{padding:"11px 12px",cursor:"pointer",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:9,color:"#888",marginBottom:2,letterSpacing:1}}>{risk.cat.toUpperCase()}</div>
          <div style={{fontSize:12,fontWeight:700,color:"#111",lineHeight:1.4}}>{risk.title}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
          <div style={{fontSize:8,color:cfg.c,fontWeight:700,background:cfg.bg,padding:"2px 6px",borderRadius:3,border:`1px solid ${cfg.c}44`,whiteSpace:"nowrap"}}>{cfg.l}</div>
          <span style={{fontSize:11,color:"#bbb"}}>{o?"▲":"▼"}</span>
        </div>
      </div>
      {o&&(
        <div style={{padding:"0 12px 12px",borderTop:"1px solid #f0f4f8"}}>
          <div style={{fontSize:12,color:"#222",lineHeight:1.65,marginBottom:9}}>{risk.desc}</div>
          <div style={{background:"#eafaf1",border:"1px solid #a9dfbf",borderRadius:6,padding:"8px 10px"}}>
            <div style={{fontSize:9,color:"#1e8449",letterSpacing:1,marginBottom:3}}>✓ MITIGATION</div>
            <div style={{fontSize:12,color:"#1a4a2a",lineHeight:1.65}}>{risk.mit}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GANTT ────────────────────────────────────────────────────────────────────
function GanttChart({answers}){
  const jcfg=JURISDICTIONS[answers.jurisdiction]||{};
  const isWA=answers.state==="WA";
  const isMajor=["major"].includes(answers.pte_co)||["major"].includes(answers.pte_nox)||answers.hap==="major_source";
  const isEmerg=answers.operation_type==="emergency";
  const needsTAP=["above_sqer","unknown"].includes(answers.tap);
  const needsMod=isMajor||["psd_ser","major"].includes(answers.pte_co)||answers.state==="NV";
  const needsGHGRP=["25k_100k","gt100k"].includes(answers.ghg);
  const tasks=[];
  tasks.push({id:"scope",label:"Project Scoping & Pre-App Meeting",start:0,dur:6,phase:"Pre-Application",crit:true});
  tasks.push({id:"pte",label:"PTE Calculations – All Pollutants",start:2,dur:8,phase:"Pre-Application",crit:true});
  tasks.push({id:"applic",label:"Permit Applicability Determination",start:5,dur:4,phase:"Pre-Application",crit:true});
  if(!isEmerg){
    if(isWA) tasks.push({id:"sepa",label:"SEPA Environmental Checklist",start:8,dur:4,phase:"Permit Application",crit:true});
    tasks.push({id:"bact",label:"BACT / BSC Analysis",start:8,dur:10,phase:"Permit Application",crit:true});
    if(needsTAP||answers.state==="NV") tasks.push({id:"tap",label:"TAP / Environmental Evaluation (AERMOD)",start:10,dur:9,phase:"Permit Application",crit:true});
    if(needsMod) tasks.push({id:"mod",label:"AERMOD Criteria Modeling",start:12,dur:14,phase:"Permit Application",crit:true});
    tasks.push({id:"sub",label:"Permit Application Submittal",start:20,dur:2,phase:"Permit Application",crit:true});
    tasks.push({id:"comp",label:"Agency Completeness Review",start:22,dur:5,phase:"Agency Review",crit:true});
    tasks.push({id:"tech",label:"Technical Review & Prelim Determination",start:27,dur:9,phase:"Agency Review",crit:true});
    tasks.push({id:"notic",label:"Public Notice / Comment Period",start:34,dur:isMajor?8:4,phase:"Public Process",crit:isMajor});
    tasks.push({id:"permit",label:"Permit Issued",start:38,dur:3,phase:"Agency Review",crit:true});
  }
  if(isMajor){
    tasks.push({id:"psd",label:"PSD Permit (State Lead – parallel)",start:8,dur:60,phase:"PSD / Title V",crit:true});
    tasks.push({id:"tv",label:"Title V / Tier I / Class I AOP",start:42,dur:26,phase:"PSD / Title V",crit:true});
  }
  const cs=!isEmerg?(isMajor?68:42):12;
  tasks.push({id:"constr",label:"Construction & Installation",start:cs,dur:isMajor?28:16,phase:"Construction",crit:true});
  const ps=cs+(isMajor?28:16);
  tasks.push({id:"comm",label:"Pre-Op Testing / Commissioning",start:ps,dur:4,phase:"Post-Construction",crit:true});
  tasks.push({id:"stack",label:"Initial Stack Performance Test",start:ps+2,dur:6,phase:"Post-Construction",crit:true});
  tasks.push({id:"reg",label:"Agency Registration / Annual Program",start:ps+4,dur:3,phase:"Post-Construction",crit:false});
  if(needsGHGRP) tasks.push({id:"ghgrp",label:"EPA GHGRP Annual Report",start:ps+8,dur:4,phase:"Ongoing Compliance",crit:true});
  if(answers.ghg==="gt100k"&&isWA) tasks.push({id:"cap",label:"WA Cap-and-Invest Registration",start:ps+6,dur:5,phase:"Ongoing Compliance",crit:true});
  const totalW=Math.max(...tasks.map(t=>t.start+t.dur))+4;
  const W=660,LBL=160,ROW=26,HEAD=40,BAR=W-LBL;
  const toX=w=>LBL+(w/totalW)*BAR,toW=d=>Math.max((d/totalW)*BAR,5);
  const months=Math.ceil(totalW/4.33);
  const H=tasks.length*ROW+HEAD+10;
  return(
    <div style={{background:"#fff",borderRadius:12,border:"1px solid #e4e8ef",padding:12,overflowX:"auto"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:2}}>Permitting Timeline — Estimated Schedule</div>
      <div style={{fontSize:10,color:"#888",marginBottom:8}}>Approximate schedule. Parallel PSD track shown if applicable. All durations are estimates.</div>
      <svg width="100%" viewBox={"0 0 "+W+" "+H} style={{minWidth:420}}>
        {Array.from({length:months+1},(_,m)=>{const x=toX(m*4.33);return(<g key={m}><line x1={x} y1={HEAD-4} x2={x} y2={H} stroke="#eaeff5" strokeWidth={1}/>{m>0&&<text x={x+2} y={HEAD-7} fontSize={7} fill="#aaa">{"M"+m}</text>}</g>);})}
        <line x1={LBL} y1={HEAD} x2={W} y2={HEAD} stroke="#d0dce8" strokeWidth={1}/>
        {tasks.map((task,i)=>{const y=HEAD+i*ROW,x=toX(task.start),w=toW(task.dur),col=PC[task.phase]||"#4a4a7a",alpha=task.crit?"dd":"66";return(<g key={task.id}><text x={2} y={y+ROW/2+3} fontSize={7.5} fill={col} fontWeight={600} clipPath={"url(#lc"+i+")"} >{task.phase}</text><clipPath id={"lc"+i}><rect x={0} y={y} width={LBL-4} height={ROW}/></clipPath><rect x={x} y={y+3} width={w} height={ROW-7} rx={3} fill={col+alpha}/><text x={x+3} y={y+ROW/2+3} fontSize={7} fill="#fff" clipPath={"url(#bc"+i+")"} >{task.label}</text><clipPath id={"bc"+i}><rect x={x} y={y+3} width={w} height={ROW-7}/></clipPath></g>);})}
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:6}}>
        {[...new Set(tasks.map(t=>t.phase))].map(ph=>(<div key={ph} style={{display:"flex",alignItems:"center",gap:3,fontSize:9,color:PC[ph]||"#444"}}><div style={{width:9,height:6,borderRadius:2,background:PC[ph]||"#444"}}/>{ph}</div>))}
      </div>
    </div>
  );
}

// ─── BACT PANEL ───────────────────────────────────────────────────────────────
function BACTPanel({sourceType}){
  const[sel,setSel]=useState(sourceType&&BACT_GUIDANCE[sourceType]?sourceType:"combustion_turbine");
  const g=BACT_GUIDANCE[sel];
  return(
    <div>
      <div style={{background:"#f0f5fb",borderRadius:8,padding:"9px 12px",marginBottom:10,border:"1px solid #c8ddf0",fontSize:11,color:"#234",lineHeight:1.6}}>
        BACT/BSC guidance applies across WA, MT, NV, and ID. All four states follow the top-down methodology. NV minor sources use BSC (functionally identical). Reference: <strong style={{color:"#1a4d7a"}}>EPA RBLC — rblc.epa.gov</strong>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
        {Object.entries(BACT_GUIDANCE).map(([k,v])=>(<button key={k} onClick={()=>setSel(k)} style={{padding:"5px 10px",borderRadius:16,border:"1px solid #d0dce8",background:sel===k?"#0a1628":"#fff",color:sel===k?"#fff":"#444",fontSize:10,cursor:"pointer",fontWeight:sel===k?700:400}}>{v.title.split("(")[0].trim().slice(0,28)}</button>))}
      </div>
      <div style={{background:"#fff",borderRadius:9,border:"1px solid #e4e8ef",overflow:"hidden"}}>
        <div style={{background:"#0a1628",padding:"9px 13px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{g.title}</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:500}}>
            <thead>
              <tr style={{background:"#f8fafc",borderBottom:"1px solid #e4e8ef"}}>
                {["Pollutant","Tier 1 (Most Stringent)","Tier 1 Level","Tier 2 Alternative","Tier 2 Level","Notes / NSPS Floor"].map(h=>(<th key={h} style={{padding:"6px 8px",textAlign:"left",fontSize:8,color:"#888",whiteSpace:"nowrap"}}>{h.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              {g.pollutants.map((row,i)=>(<tr key={row.p} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f0f4f8",verticalAlign:"top"}}>
                <td style={{padding:"7px 8px",fontWeight:700,color:"#1a4d7a",whiteSpace:"nowrap"}}>{row.p}</td>
                <td style={{padding:"7px 8px",color:"#222",lineHeight:1.5}}>{row.t1}</td>
                <td style={{padding:"7px 8px",color:"#1e8449",fontSize:10,whiteSpace:"nowrap"}}>{row.t1l}</td>
                <td style={{padding:"7px 8px",color:"#444",lineHeight:1.5}}>{row.t2}</td>
                <td style={{padding:"7px 8px",color:"#d68910",fontSize:10,whiteSpace:"nowrap"}}>{row.t2l}</td>
                <td style={{padding:"7px 8px",color:"#555",lineHeight:1.5,fontSize:10}}>{row.notes}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── NAAQS TABLE ─────────────────────────────────────────────────────────────
function NAAAQSTable(){
  return(
    <div style={{background:"#fff",borderRadius:9,border:"1px solid #e4e8ef",overflow:"hidden"}}>
      <div style={{background:"#0a1628",padding:"9px 13px"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>NAAQS Standards, PSD Significant Emission Rates & Major Source Thresholds</div>
        <div style={{fontSize:9,color:"#8abadd",marginTop:2}}>PM2.5 Annual NAAQS = 9.0 µg/m³ (revised Feb 2024) · SO₂ secondary revised to 10 ppb annual (Jan 2025) · Applies all four states</div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:400}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e4e8ef"}}>
              {["Pollutant","NAAQS Standard","PSD SER","Major Source Threshold"].map(h=>(<th key={h} style={{padding:"7px 9px",textAlign:"left",fontSize:8,color:"#888"}}>{h.toUpperCase()}</th>))}
            </tr>
          </thead>
          <tbody>
            {NAAQS_DATA.map((row,i)=>(<tr key={row.p} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f0f4f8"}}>
              <td style={{padding:"7px 9px",fontWeight:700,color:"#1a4d7a"}}>{row.p}</td>
              <td style={{padding:"7px 9px",color:"#222",fontSize:10}}>{row.std}</td>
              <td style={{padding:"7px 9px",color:"#c0392b",fontWeight:700,fontSize:10}}>{row.ser}</td>
              <td style={{padding:"7px 9px",color:"#444",fontSize:10}}>{row.major}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MODELING PANEL ───────────────────────────────────────────────────────────
function ModelingPanel({jurisdiction}){
  const jcfg=JURISDICTIONS[jurisdiction]||{};
  const agName=jcfg.agency||"Agency";
  return(
    <div>
      {/* Current agency modeling requirements */}
      {jcfg.modeling_minor&&(
        <div style={{marginBottom:14}}>
          <div style={{background:"#0a1628",borderRadius:"9px 9px 0 0",padding:"10px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{agName} — Air Modeling Requirements</div>
            <div style={{fontSize:9,color:"#8abadd",marginTop:2}}>Based on your selected jurisdiction</div>
          </div>
          <div style={{background:"#fff",borderRadius:"0 0 9px 9px",border:"1px solid #e4e8ef",borderTop:"none"}}>
            {[
              {label:"Criteria Pollutant Modeling — Minor Sources",val:jcfg.modeling_minor,color:"#1a5a7a"},
              {label:"Criteria Pollutant Modeling — Major Sources",val:"Full AERMOD required per 40 CFR Part 51 Appendix W (revised Nov 2024, effective Jan 28, 2025 with 1-year transition). PSD increment analysis. Class I area analysis if within 100 km of wilderness/park.",color:"#1a5a7a"},
              {label:"Toxic Air Pollutant (TAP) Modeling Approach",val:jcfg.modeling_tap,color:"#7a1a5a"},
              {label:"Preferred Meteorological Stations",val:jcfg.modeling_met,color:"#1a5a2a"},
              {label:"Agency-Specific Notes",val:jcfg.modeling_minor?.includes("MANDATORY")?"See modeling requirements above for mandatory protocol submission details.":"Contact "+agName+" staff for current modeling guidance and preferred protocols.",color:"#8c5e1b"},
            ].map((item,i)=>(
              <div key={i} style={{padding:"11px 14px",borderBottom:i<4?"1px solid #f0f4f8":"none"}}>
                <div style={{fontSize:9,color:item.color,letterSpacing:1,marginBottom:3,fontWeight:700}}>{item.label.toUpperCase()}</div>
                <div style={{fontSize:12,color:"#222",lineHeight:1.65}}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Comparison across all agencies */}
      <div style={{background:"#fff",borderRadius:9,border:"1px solid #e4e8ef",overflow:"hidden"}}>
        <div style={{background:"#0a1628",padding:"9px 13px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>Air Modeling Requirements — All Agencies Comparison</div>
          <div style={{fontSize:9,color:"#8abadd",marginTop:2}}>AERMOD (40 CFR Part 51 Appendix W revised Nov 2024) is the required model in all jurisdictions</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:600}}>
            <thead>
              <tr style={{background:"#f8fafc",borderBottom:"2px solid #e4e8ef"}}>
                {["Agency","Minor Source Criteria Modeling","Major Source Criteria Modeling","TAP/Toxic Modeling Approach","Protocol Required?","Key Agency Nuance"].map(h=>(<th key={h} style={{padding:"7px 9px",textAlign:"left",fontSize:8,color:"#888",borderRight:"1px solid #e4e8ef"}}>{h.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              {MODELING_MATRIX.map((row,i)=>(
                <tr key={row.agency} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f0f4f8",verticalAlign:"top"}}>
                  <td style={{padding:"7px 9px",fontWeight:700,color:"#111",fontSize:10,borderRight:"1px solid #f0f4f8",whiteSpace:"nowrap"}}>{row.agency}</td>
                  <td style={{padding:"7px 9px",color:"#444",fontSize:10,lineHeight:1.5,borderRight:"1px solid #f0f4f8"}}>{row.minor_criteria}</td>
                  <td style={{padding:"7px 9px",color:"#444",fontSize:10,lineHeight:1.5,borderRight:"1px solid #f0f4f8"}}>{row.major_criteria}</td>
                  <td style={{padding:"7px 9px",color:"#7a1a5a",fontSize:10,lineHeight:1.5,borderRight:"1px solid #f0f4f8"}}>{row.tap_approach}</td>
                  <td style={{padding:"7px 9px",color:row.protocol.includes("MANDATORY")?"#c0392b":"#444",fontSize:10,lineHeight:1.5,borderRight:"1px solid #f0f4f8",fontWeight:row.protocol.includes("MANDATORY")?700:400}}>{row.protocol}</td>
                  <td style={{padding:"7px 9px",color:"#1a4d7a",fontSize:10,lineHeight:1.5}}>{row.nuance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── STATE COMPARE TABLE ──────────────────────────────────────────────────────
function StateCompareTable(){
  return(
    <div style={{background:"#fff",borderRadius:9,border:"1px solid #e4e8ef",overflow:"hidden"}}>
      <div style={{background:"#0a1628",padding:"9px 13px"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>State Air Permitting Framework Comparison: WA · MT · NV · ID</div>
        <div style={{fontSize:9,color:"#8abadd",marginTop:2}}>Federal NSPS/NESHAP/PSD/Title V apply equally in all four states regardless of local jurisdiction</div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:560}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"2px solid #e4e8ef"}}>
              {["Program Element","Washington (WA)","Montana (MT)","Nevada (NV)","Idaho (ID)"].map((h,i)=>(<th key={h} style={{padding:"7px 9px",textAlign:"left",fontSize:8,color:i===0?"#888":["#1a4d7a","#8c2a1a","#4a7a1a","#3a3a8c"][i-1],borderRight:"1px solid #e4e8ef"}}>{h.toUpperCase()}</th>))}
            </tr>
          </thead>
          <tbody>
            {STATE_COMPARE.map((row,i)=>(<tr key={row.field} style={{background:i%2===0?"#fff":"#fafbfc",borderBottom:"1px solid #f0f4f8",verticalAlign:"top"}}>
              <td style={{padding:"7px 9px",fontWeight:700,color:"#222",fontSize:10,borderRight:"1px solid #f0f4f8",whiteSpace:"nowrap"}}>{row.field}</td>
              {["WA","MT","NV","ID"].map(st=>(<td key={st} style={{padding:"7px 9px",color:row[st]?.includes("MANDATORY")||row[st]?.includes("SERIOUS")||row[st]?.includes("nonattainment")?"#c0392b":"#444",fontSize:10,lineHeight:1.5,borderRight:"1px solid #f0f4f8"}}>{row[st]}</td>))}
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const[screen,setScreen]=useState("intro");
  const[qIdx,setQIdx]=useState(0);
  const[answers,setAnswers]=useState({});
  const[results,setResults]=useState(null);
  const[tab,setTab]=useState("regs");
  const[akey,setAkey]=useState(0);

  const jcfg=JURISDICTIONS[answers.jurisdiction]||{};
  const stateColor=ST_COLORS[answers.state]||"#1a4d7a";

  const questionList=BASE_QUESTIONS.map(q=>{
    if(q.dynamic&&q.id==="jurisdiction") return{...q,opts:JURISDICTION_BY_STATE[answers.state]||JURISDICTION_BY_STATE.WA};
    if(q.dynamicOpts) return{...q,opts:buildDynamicOpts(q,jcfg)};
    return q;
  });
  const q=questionList[qIdx];
  const pct=Math.round(((qIdx+1)/questionList.length)*100);
  const highRisks=results?.risks.filter(r=>r.sev==="high").length||0;

  function handleAnswer(v){
    const na={...answers,[q.id]:v};
    setAnswers(na);
    if(qIdx<questionList.length-1){setQIdx(qIdx+1);setAkey(k=>k+1);}
    else{const r=buildResults(na);setResults(r);setScreen("results");setTab("regs");}
  }
  function restart(){setScreen("intro");setQIdx(0);setAnswers({});setResults(null);setAkey(0);}

  const regGroups=results?results.regs.reduce((acc,r)=>{if(!acc[r.cat])acc[r.cat]=[];acc[r.cat].push(r);return acc;},{}):{};

  return(
    <div style={{minHeight:"100vh",background:"#eef1f7",fontFamily:"'Helvetica Neue',Arial,sans-serif",paddingBottom:48}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}} button:focus{outline:none} * {box-sizing:border-box}`}</style>

      {/* HEADER */}
      <div style={{background:"#08111e",padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,.45)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:6,background:`linear-gradient(135deg,${stateColor},#2d8fc4)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🏭</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.2}}>Multi-State Air Permit Roadmap</div>
            <div style={{fontSize:8,color:"#5a8ab0",letterSpacing:0.8}}>WA · MT · NV · ID — NSPS / NESHAP / PSD / TITLE V</div>
          </div>
        </div>
        {screen==="results"&&<button onClick={restart} style={{background:"transparent",border:"1px solid #3a5a7a",borderRadius:5,color:"#7abadd",fontSize:10,padding:"5px 10px",cursor:"pointer"}}>← New</button>}
      </div>

      <div style={{maxWidth:720,margin:"0 auto",padding:"0 12px"}}>

        {/* ── INTRO ── */}
        {screen==="intro"&&(
          <div style={{paddingTop:28,animation:"fadeUp .4s ease"}}>
            <div style={{background:"#fff",borderRadius:12,padding:"24px 20px",boxShadow:"0 4px 24px rgba(0,0,0,.08)",border:"1px solid #e4e8ef"}}>
              <div style={{fontSize:9,color:"#1a6faf",letterSpacing:1.5,marginBottom:8}}>MULTI-STATE AIR QUALITY COMPLIANCE</div>
              <h1 style={{fontSize:21,fontWeight:700,color:"#08111e",margin:"0 0 10px",lineHeight:1.2}}>Air Permit Roadmap Tool</h1>
              <p style={{fontSize:12,color:"#444",lineHeight:1.7,margin:"0 0 16px"}}>Covers Washington (NWCAA, PSCAA, SWCAA, Ecology), Montana (DEQ + County Programs), Nevada (NDEP BAPC, Clark County DAQ, NNPH AQMD), and Idaho (DEQ). Includes federal NSPS/NESHAP, PSD, Title V, and state-specific NSR, toxic air, and GHG obligations. NSR thresholds shown dynamically for your selected agency.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                {[{i:"🗺️",t:"4-State Coverage",d:"WA, MT, NV, ID — agency-specific pathways"},{i:"📋",t:"Regulations",d:"Federal NSPS/NESHAP, PSD, Title V, NNSR + local rules"},{i:"📊",t:"Gantt Timeline",d:"Visual schedule pre-app through ongoing compliance"},{i:"⚗️",t:"BACT/BSC Guide",d:"Technology- and pollutant-specific control guidance"},{i:"🌡️",t:"Modeling Summary",d:"Agency-specific AERMOD requirements + comparison table"},{i:"⚠️",t:"Risk Analysis",d:"State-specific risks with severity + mitigation"}].map(x=>(<div key={x.t} style={{background:"#f8fafc",borderRadius:7,padding:"10px 11px",border:"1px solid #e4e8ef"}}><div style={{fontSize:16,marginBottom:3}}>{x.i}</div><div style={{fontSize:11,fontWeight:700,color:"#111",marginBottom:1}}>{x.t}</div><div style={{fontSize:10,color:"#777",lineHeight:1.5}}>{x.d}</div></div>))}
              </div>
              <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                {[{st:"WA",c:"#1a4d7a",d:"NWCAA/PSCAA/SWCAA"},{st:"MT",c:"#8c2a1a",d:"DEQ + County"},{st:"NV",c:"#4a7a1a",d:"NDEP/Clark/Washoe"},{st:"ID",c:"#3a3a8c",d:"DEQ Statewide"}].map(s=>(<div key={s.st} style={{flex:"1 1 80px",background:s.c+"12",border:`1px solid ${s.c}44`,borderRadius:7,padding:"8px 10px",textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.st}</div><div style={{fontSize:9,color:s.c}}>{s.d}</div></div>))}
              </div>
              <div style={{background:"#f0f5fb",borderRadius:7,padding:"10px 12px",marginBottom:14,borderLeft:"4px solid #1a6faf"}}>
                <div style={{fontSize:8,color:"#1a6faf",letterSpacing:1,marginBottom:2}}>DISCLAIMER</div>
                <div style={{fontSize:10,color:"#444",lineHeight:1.6}}>Guidance only — not legal advice. Regulations subject to change. Always verify with the applicable state agency or licensed air quality professional before commencing permitting.</div>
              </div>
              <button onClick={()=>setScreen("screening")} style={{width:"100%",padding:12,background:"linear-gradient(135deg,#08111e,#1a4d7a)",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Begin Screening → ({questionList.length} questions, ~5 min)
              </button>
            </div>
          </div>
        )}

        {/* ── SCREENING ── */}
        {screen==="screening"&&(
          <div style={{paddingTop:20}}>
            <div style={{marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:9,color:"#888",letterSpacing:0.8}}>Q {qIdx+1}/{questionList.length} — {q.section?.toUpperCase()}</span>
                <span style={{fontSize:9,color:"#888"}}>{pct}%</span>
              </div>
              <div style={{height:3,background:"#dce4ef",borderRadius:2}}><div style={{height:3,background:`linear-gradient(90deg,${stateColor},#2d8fc4)`,borderRadius:2,width:`${pct}%`,transition:"width .4s ease"}}/></div>
            </div>
            <div key={akey} style={{background:"#fff",borderRadius:12,padding:"20px 16px",boxShadow:"0 4px 20px rgba(0,0,0,.07)",border:"1px solid #e4e8ef",animation:"fadeIn .25s ease"}}>
              <div style={{fontSize:14,fontWeight:700,color:"#08111e",lineHeight:1.4,marginBottom:16}}>{q.q}</div>
              {/* Show threshold hint for PTE questions */}
              {q.dynamicOpts&&jcfg.nsr_thresholds&&(
                <div style={{background:"#f0f5fb",borderRadius:6,padding:"7px 10px",marginBottom:12,borderLeft:"3px solid #1a6faf",fontSize:10,color:"#1a4d7a",lineHeight:1.6}}>
                  <strong>{jcfg.agency||"Agency"} NSR threshold for {q.pollutant==="PM25"?"PM2.5":q.pollutant==="PM10"?"PM10":q.pollutant}:</strong>{" "}
                  {jcfg.nsr_thresholds[q.pollutant]!=null?`${jcfg.nsr_thresholds[q.pollutant]} tpy (any PTE at or above this level triggers a permit)`:"Any emission from any source triggers a permit in this jurisdiction (no de minimis threshold)."}
                  {" | PSD SER: "+q.psd_ser}
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {(q.opts||[]).map(opt=>(<button key={opt.v} onClick={()=>handleAnswer(opt.v)}
                  style={{padding:"10px 13px",borderRadius:7,border:`1px solid ${answers[q.id]===opt.v?stateColor:"#dce4ef"}`,background:answers[q.id]===opt.v?"#f0f5fb":"#fafbfd",cursor:"pointer",textAlign:"left",fontSize:11,color:"#111",fontWeight:500,lineHeight:1.4,display:"flex",alignItems:"flex-start",gap:8,width:"100%",transition:"all .13s ease"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=stateColor;e.currentTarget.style.background="#f0f5fb";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=answers[q.id]===opt.v?stateColor:"#dce4ef";e.currentTarget.style.background=answers[q.id]===opt.v?"#f0f5fb":"#fafbfd";}}>
                  <div style={{width:15,height:15,borderRadius:"50%",border:`2px solid ${answers[q.id]===opt.v?stateColor:"#c0ccd8"}`,flexShrink:0,background:answers[q.id]===opt.v?stateColor:"transparent",marginTop:1}}/>
                  <span>{opt.l}</span>
                </button>))}
              </div>
              {qIdx>0&&<button onClick={()=>{setQIdx(qIdx-1);setAkey(k=>k+1);}} style={{marginTop:14,background:"transparent",border:"none",fontSize:10,color:"#888",cursor:"pointer",padding:0}}>← Previous</button>}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {screen==="results"&&results&&(
          <div style={{paddingTop:16,animation:"fadeUp .4s ease"}}>

            {/* Summary banner */}
            <div style={{background:`linear-gradient(135deg,#08111e,${stateColor})`,borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"flex-start",boxShadow:"0 4px 18px rgba(0,0,0,.2)",gap:8}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:8,color:"#6a9cc0",letterSpacing:1,marginBottom:2}}>{answers.state} — {jcfg.label||answers.jurisdiction}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:2}}>Permit Roadmap Generated</div>
                <div style={{fontSize:10,color:"#8abadd"}}>{results.regs.length} regs · {results.steps.length} steps · {results.risks.length} risks · {highRisks} high</div>
              </div>
              {highRisks>0&&<div style={{background:"#c0392b22",border:"1px solid #c0392b55",borderRadius:8,padding:"7px 12px",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:20,fontWeight:700,color:"#e74c3c"}}>{highRisks}</div>
                <div style={{fontSize:8,color:"#e09a9a"}}>HIGH RISKS</div>
              </div>}
            </div>

            {/* Nonattainment warning */}
            {(jcfg.nonattainment_note||jcfg.extra_notes?.length>0)&&(
              <div style={{background:"#fffbee",border:"1px solid #f0d88a",borderRadius:8,padding:"9px 12px",marginBottom:12}}>
                <div style={{fontSize:8,color:"#8a6010",letterSpacing:1,marginBottom:4}}>JURISDICTION NOTES — {jcfg.agency}</div>
                {jcfg.nonattainment_note&&<div style={{fontSize:11,color:jcfg.nonattainment_note.includes("SERIOUS")||jcfg.nonattainment_note.includes("nonattainment")?"#c0392b":"#5a4010",lineHeight:1.65,marginBottom:4,fontWeight:jcfg.nonattainment_note.includes("SERIOUS")?"700":"400"}}>⚠ {jcfg.nonattainment_note}</div>}
                {(jcfg.extra_notes||[]).map((n,i)=>(<div key={i} style={{fontSize:10,color:"#5a4010",lineHeight:1.65,marginBottom:i<(jcfg.extra_notes.length-1)?3:0}}>• {n}</div>))}
              </div>
            )}

            {/* Tabs — 2 rows for mobile */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3,marginBottom:10,background:"#fff",borderRadius:8,padding:3,boxShadow:"0 1px 5px rgba(0,0,0,.07)"}}>
              {[{id:"regs",l:`Regs (${results.regs.length})`},{id:"steps",l:`Steps (${results.steps.length})`},{id:"gantt",l:"Timeline"},{id:"bact",l:"BACT"},{id:"modeling",l:"Modeling"},{id:"naaqs",l:"NAAQS"},{id:"compare",l:"Compare"},{id:"risks",l:`Risks (${results.risks.length})`}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 2px",borderRadius:5,border:"none",cursor:"pointer",background:tab===t.id?"#08111e":"transparent",color:tab===t.id?"#fff":"#555",fontSize:10,fontWeight:tab===t.id?700:400,transition:"all .2s",lineHeight:1.2}}>{t.l}</button>))}
            </div>

            {/* REGULATIONS */}
            {tab==="regs"&&(
              <div>
                {Object.entries(regGroups).map(([cat,catRegs])=>(
                  <div key={cat} style={{marginBottom:14}}>
                    <div style={{fontSize:8,color:cc(cat),letterSpacing:1.2,marginBottom:6,fontWeight:700,borderBottom:`1px solid ${cc(cat)}33`,paddingBottom:3}}>{cat.toUpperCase()}</div>
                    {catRegs.map(r=><RegCard key={r.id} reg={r}/>)}
                  </div>
                ))}
              </div>
            )}

            {/* STEPS */}
            {tab==="steps"&&(
              <div>
                <div style={{background:"#fff",borderRadius:7,padding:"8px 12px",marginBottom:10,border:"1px solid #e4e8ef",fontSize:11,color:"#444",lineHeight:1.6}}>
                  Steps marked <strong style={{color:stateColor}}>CRITICAL</strong> are required for permit issuance. Tap any step to expand details and practitioner tips.
                </div>
                <div style={{paddingLeft:2}}>{results.steps.map(s=><StepCard key={s.n+s.title} step={s}/>)}</div>
              </div>
            )}

            {/* GANTT */}
            {tab==="gantt"&&(
              <div>
                <GanttChart answers={answers}/>
                <div style={{background:"#fff",borderRadius:8,padding:"10px 13px",marginTop:10,border:"1px solid #e4e8ef"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#111",marginBottom:3}}>Timeline Notes</div>
                  <div style={{fontSize:10,color:"#555",lineHeight:1.75}}>• M1 = project initiation / first agency contact<br/>• PSD track runs parallel with construction permit — never sequential<br/>• NV: modeling protocol approval required before AQOP application<br/>• ID: modeling protocol approval required ≥1 month before PTC application<br/>• MT MAQP: combines construction and operating authorization in one permit</div>
                </div>
              </div>
            )}

            {/* BACT */}
            {tab==="bact"&&<BACTPanel sourceType={answers.source_type}/>}

            {/* MODELING */}
            {tab==="modeling"&&<ModelingPanel jurisdiction={answers.jurisdiction}/>}

            {/* NAAQS */}
            {tab==="naaqs"&&<NAAAQSTable/>}

            {/* STATE COMPARE */}
            {tab==="compare"&&<StateCompareTable/>}

            {/* RISKS */}
            {tab==="risks"&&(
              <div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {["high","medium","low"].map(sev=>{const count=results.risks.filter(r=>r.sev===sev).length;const cfg=SEV[sev];return(<div key={sev} style={{background:cfg.bg,border:`1px solid ${cfg.c}44`,borderRadius:8,padding:10,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:cfg.c}}>{count}</div><div style={{fontSize:8,color:cfg.c,letterSpacing:0.8}}>{cfg.l} RISK</div></div>);})}
                </div>
                {["high","medium","low"].map(sev=>{const sr=results.risks.filter(r=>r.sev===sev);if(!sr.length)return null;const cfg=SEV[sev];return(<div key={sev} style={{marginBottom:14}}><div style={{fontSize:8,color:cfg.c,letterSpacing:1.2,marginBottom:6,fontWeight:700,borderBottom:`1px solid ${cfg.c}33`,paddingBottom:3}}>{cfg.l} RISK ITEMS</div>{sr.map((r,i)=><RiskCard key={i} risk={r}/>)}</div>);})}
              </div>
            )}

            <div style={{marginTop:16,background:"#fff",borderRadius:10,padding:"14px 16px",border:"1px solid #e4e8ef",textAlign:"center"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:3}}>Need to revise inputs?</div>
              <div style={{fontSize:11,color:"#666",marginBottom:10}}>Restart to generate a new roadmap for a different state, jurisdiction, or facility type.</div>
              <button onClick={restart} style={{background:"#08111e",color:"#fff",border:"none",borderRadius:7,padding:"9px 20px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Start New Analysis</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}