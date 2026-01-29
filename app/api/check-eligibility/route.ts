import { NextResponse } from "next/server";

/**
 * Backend user profile structure
 */
interface BackendUserProfile {
  age: string;
  nationality: string;
  education: string;
  employment: string;
  income: string;
  visa_type: string;
  extra: {
    [key: string]: any;
  };
}

/**
 * Map frontend visa types to backend categories
 */
const visaTypeToCategory: Record<string, string> = {
  "F1 Student": "f1",
  "H1B Work": "h1",
  "B1/B2 Visitor": "b1b2",
  "K1 Fiance": "k1",
};

/**
 * Map frontend field names → backend field names
 */
const fieldNameMapping: Record<string, string> = {
  // F1
  universityAcceptance: "university_acceptance",
  schoolName: "school_name",
  formI20Issued: "i20_issued",
  proofOfFundsAmount: "proof_of_funds_amount",
  testScores: "test_scores",

  // H1B
  jobOffer: "job_offer",
  employerName: "employer_name",
  yearsExperience: "years_experience",
  degreeEquiv: "degree_equiv",

  // B1/B2
  travelPurpose: "travel_purpose",
  tripDurationDays: "trip_duration_days",
  invitationHost: "invitation_host",
  returnTicket: "return_ticket",

  // K1
  usCitizenSponsor: "us_citizen_sponsor",
  metInPerson: "met_in_person",
  relationshipLengthMonths: "relationship_length_months",
  evidenceList: "evidence_list",
};

/**
 * POST /api/evaluate
 * Frontend → Next.js → FastAPI backend (Render)
 */
export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const category = visaTypeToCategory[formData.visaType];
    if (!category) {
      return NextResponse.json(
        { error: "Invalid visa type" },
        { status: 400 }
      );
    }

    const extraData: Record<string, any> = {};

    // Transform frontend fields → backend fields
    for (const key in formData) {
      if (key in fieldNameMapping) {
        extraData[fieldNameMapping[key]] = formData[key];
      }
    }

    const backendProfile: BackendUserProfile = {
      age: String(formData.age || ""),
      nationality: formData.nationality || "",
      education: formData.education || "",
      employment: formData.employment || "",
      income: formData.income || "",
      visa_type: formData.visaType,
      extra: {
        [category]: extraData,
      },
    };

    // 🔥 REAL BACKEND CALL (Render FastAPI)
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/evaluate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendProfile),
      }
    );

    if (!backendRes.ok) {
      const errText = await backendRes.text();
      return NextResponse.json(
        { error: "Backend error", details: errText },
        { status: 500 }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Frontend API route failed",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
