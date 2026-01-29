"use client";

import type React from "react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormData = {
  visaType: string;
  age: string;
  nationality: string;
  education: string;
  employment: string;
  income: string;
  // F1 Student specific
  universityAcceptance: string;
  schoolName: string;
  formI20Issued: string;
  proofOfFundsAmount: string;
  testScores: string;
  // H1B specific
  jobOffer: string;
  employerName: string;
  yearsExperience: string;
  degreeEquiv: string;
  // B1/B2 specific
  travelPurpose: string;
  tripDurationDays: string;
  invitationHost: string;
  returnTicket: string;
  // K1 specific
  usCitizenSponsor: string;
  metInPerson: string;
  relationshipLengthMonths: string;
  evidenceList: string;
};

type Result = {
  decision?: string;
  explanation?: string;
  confidence?: number;
  citations?: number[];
  missing_information?: string[];
  error?: string;
};

const initialFormData: FormData = {
  visaType: "",
  age: "",
  nationality: "",
  education: "",
  employment: "",
  income: "",
  universityAcceptance: "",
  schoolName: "",
  formI20Issued: "",
  proofOfFundsAmount: "",
  testScores: "",
  jobOffer: "",
  employerName: "",
  yearsExperience: "0",
  degreeEquiv: "",
  travelPurpose: "",
  tripDurationDays: "7",
  invitationHost: "",
  returnTicket: "",
  usCitizenSponsor: "",
  metInPerson: "",
  relationshipLengthMonths: "0",
  evidenceList: "",
};

export function EligibilityFormClient() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [result, setResult] = useState<Result | null>(null);
  const [provisionalResult, setProvisionalResult] = useState<Result | null>(
    null
  );
  const [submittedFormData, setSubmittedFormData] = useState<FormData | null>(
    null
  );

  const [missingInfo, setMissingInfo] = useState<{ [key: string]: string }>({});
  const [hasRerun, setHasRerun] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMissingInfoChange = (field: string, value: string) => {
    setMissingInfo((prev) => ({ ...prev, [field]: value }));
  };

  // -------- First run (like Streamlit "Evaluate") --------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setResult(null);
    setProvisionalResult(null);
    setHasRerun(false);
    setMissingInfo({});
    setSubmittedFormData(formData);

    try {
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred");
      }

      const resultData: Result = await response.json();

      if (resultData.decision === "Insufficient Data") {
        setProvisionalResult(resultData);
      }

      setResult(resultData);
    } catch (error: any) {
      setResult({ error: error.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------- Second run (like Streamlit "Submit missing info") --------
  const handleMissingInfoSubmit = async () => {
    if (!submittedFormData) return;

    const combinedData: FormData & { [key: string]: any } = {
      ...submittedFormData,
    };

    // Merge missing info into combinedData as snake_case keys
    for (const key in missingInfo) {
      const [, field] = key.split("."); // e.g. "k1.us_citizen_sponsor"
      const value = missingInfo[key];
      if (!field) continue;
      combinedData[field] = value;
    }

    setIsSubmitting(true);
    setHasRerun(true);
    setResult(null);

    try {
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred");
      }

      const resultData: Result = await response.json();
      setResult(resultData);
    } catch (error: any) {
      setResult({ error: error.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Visa Eligibility Assessment</CardTitle>
        <CardDescription>
          Provide basic profile information and visa type; we&apos;ll ask for
          any missing details if needed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visa Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="visaType">Select visa type</Label>
            <Select
              value={formData.visaType}
              onValueChange={(value) => updateField("visaType", value)}
            >
              <SelectTrigger id="visaType">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F1 Student">F1 Student</SelectItem>
                <SelectItem value="H1B Work">H1B Work</SelectItem>
                <SelectItem value="B1/B2 Visitor">B1/B2 Visitor</SelectItem>
                <SelectItem value="K1 Fiance">K1 Fiance</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Basic Profile Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                placeholder="Enter your nationality"
                value={formData.nationality}
                onChange={(e) => updateField("nationality", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input
              id="education"
              placeholder="Highest level of education"
              value={formData.education}
              onChange={(e) => updateField("education", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employment">Employment</Label>
              <Input
                id="employment"
                placeholder="Current employment status"
                value={formData.employment}
                onChange={(e) => updateField("employment", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Income</Label>
              <Input
                id="income"
                placeholder="Annual income"
                value={formData.income}
                onChange={(e) => updateField("income", e.target.value)}
              />
            </div>
          </div>

          {/* -------- F1 Student -------- */}
          {formData.visaType === "F1 Student" && (
            <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary">
                F1 Student Visa-specific fields
              </h3>

              <div className="space-y-2">
                <Label htmlFor="universityAcceptance">
                  University acceptance?
                </Label>
                <Select
                  value={formData.universityAcceptance}
                  onValueChange={(value) =>
                    updateField("universityAcceptance", value)
                  }
                >
                  <SelectTrigger id="universityAcceptance">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolName">School / University name</Label>
                <Input
                  id="schoolName"
                  placeholder="Enter school or university name"
                  value={formData.schoolName}
                  onChange={(e) => updateField("schoolName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formI20Issued">Is Form I-20 issued?</Label>
                <Select
                  value={formData.formI20Issued}
                  onValueChange={(value) => updateField("formI20Issued", value)}
                >
                  <SelectTrigger id="formI20Issued">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofOfFunds">
                  Proof of funds amount (currency &amp; amount)
                </Label>
                <Input
                  id="proofOfFunds"
                  placeholder="e.g., USD 50,000"
                  value={formData.proofOfFundsAmount}
                  onChange={(e) =>
                    updateField("proofOfFundsAmount", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testScores">
                  Test scores (TOEFL/IELTS/etc)
                </Label>
                <Input
                  id="testScores"
                  placeholder="e.g., TOEFL 100, IELTS 7.5"
                  value={formData.testScores}
                  onChange={(e) => updateField("testScores", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* -------- H1B Work -------- */}
          {formData.visaType === "H1B Work" && (
            <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary">
                H1B Work Visa-specific fields
              </h3>

              <div className="space-y-2">
                <Label htmlFor="jobOffer">Job offer from US employer?</Label>
                <Select
                  value={formData.jobOffer}
                  onValueChange={(value) => updateField("jobOffer", value)}
                >
                  <SelectTrigger id="jobOffer">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Streamlit: Yes / No only */}
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employerName">Employer name</Label>
                <Input
                  id="employerName"
                  placeholder="Enter employer name"
                  value={formData.employerName}
                  onChange={(e) => updateField("employerName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  placeholder="Enter years of experience"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    updateField("yearsExperience", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degreeEquiv">
                  Degree equivalency to US bachelor&apos;s?
                </Label>
                <Select
                  value={formData.degreeEquiv}
                  onValueChange={(value) => updateField("degreeEquiv", value)}
                >
                  <SelectTrigger id="degreeEquiv">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* -------- B1/B2 Visitor -------- */}
          {formData.visaType === "B1/B2 Visitor" && (
            <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary">
                B1/B2 Visitor Visa-specific fields
              </h3>

              <div className="space-y-2">
                <Label htmlFor="travelPurpose">Purpose of travel</Label>
                <Select
                  value={formData.travelPurpose}
                  onValueChange={(value) => updateField("travelPurpose", value)}
                >
                  <SelectTrigger id="travelPurpose">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Streamlit uses lowercase strings */}
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="tourism">Tourism</SelectItem>
                    <SelectItem value="medical">Medical treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tripDurationDays">Trip duration (days)</Label>
                <Input
                  id="tripDurationDays"
                  type="number"
                  placeholder="Enter trip duration in days"
                  value={formData.tripDurationDays}
                  onChange={(e) =>
                    updateField("tripDurationDays", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitationHost">
                  Invitation / host (if any)
                </Label>
                <Input
                  id="invitationHost"
                  placeholder="Enter invitation or host details"
                  value={formData.invitationHost}
                  onChange={(e) =>
                    updateField("invitationHost", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnTicket">Return ticket booked?</Label>
                <Select
                  value={formData.returnTicket}
                  onValueChange={(value) => updateField("returnTicket", value)}
                >
                  <SelectTrigger id="returnTicket">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Streamlit: Yes / No only */}
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* -------- K1 Fiance -------- */}
          {formData.visaType === "K1 Fiance" && (
            <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary">
                K1 Fiance Visa-specific fields
              </h3>

              <div className="space-y-2">
                <Label htmlFor="usCitizenSponsor">
                  Is your fiance a US citizen?
                </Label>
                <Select
                  value={formData.usCitizenSponsor}
                  onValueChange={(value) =>
                    updateField("usCitizenSponsor", value)
                  }
                >
                  <SelectTrigger id="usCitizenSponsor">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Streamlit: Yes / No only */}
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metInPerson">
                  Have you met in person within 2 years?
                </Label>
                <Select
                  value={formData.metInPerson}
                  onValueChange={(value) => updateField("metInPerson", value)}
                >
                  <SelectTrigger id="metInPerson">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Streamlit: Yes / No only */}
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationshipLengthMonths">
                  Relationship length (months)
                </Label>
                <Input
                  id="relationshipLengthMonths"
                  type="number"
                  placeholder="Enter relationship length in months"
                  value={formData.relationshipLengthMonths}
                  onChange={(e) =>
                    updateField("relationshipLengthMonths", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidenceList">
                  Evidence list (brief) – photos, tickets, messages
                </Label>
                <Input
                  id="evidenceList"
                  placeholder="e.g., photos, tickets, messages"
                  value={formData.evidenceList}
                  onChange={(e) => updateField("evidenceList", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !formData.visaType}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Eligibility...
              </>
            ) : (
              "Check Eligibility"
            )}
          </Button>

          {/* -------- Provisional result (first run) -------- */}
          {provisionalResult &&
            provisionalResult.decision === "Insufficient Data" && (
              <div className="mt-4 space-y-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5" />
                  <div>
                    <h4 className="font-semibold">Provisional result</h4>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Decision:</span>{" "}
                      {provisionalResult.decision}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {provisionalResult.explanation}
                    </p>
                    {typeof provisionalResult.confidence === "number" && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Confidence: {provisionalResult.confidence}%
                      </p>
                    )}

                    {provisionalResult.missing_information &&
                      provisionalResult.missing_information.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm font-semibold">
                            We need more info to decide — please provide:
                          </p>
                          <div className="space-y-3">
                            {provisionalResult.missing_information.map(
                              (fieldKey: string) => {
                                const [, rawField] = fieldKey.split(".");

                                const label =
                                  rawField
                                    ?.replace(/_/g, " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase()) ||
                                  fieldKey;

                                const value = missingInfo[fieldKey] || "";

                                // Match Streamlit inputs for missing fields
                                const isYNUnknown = [
                                  "university_acceptance",
                                  "i20_issued",
                                  "degree_equiv",
                                ].includes(rawField || "");
                                const isYN = [
                                  "job_offer",
                                  "return_ticket",
                                  "us_citizen_sponsor",
                                  "met_in_person",
                                ].includes(rawField || "");
                                const isNumber = [
                                  "years_experience",
                                  "trip_duration_days",
                                  "relationship_length_months",
                                ].includes(rawField || "");
                                const isTravelPurpose =
                                  rawField === "travel_purpose";

                                return (
                                  <div key={fieldKey} className="space-y-1">
                                    <Label>{label}</Label>

                                    {isYNUnknown && (
                                      <Select
                                        value={value}
                                        onValueChange={(v) =>
                                          handleMissingInfoChange(fieldKey, v)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Yes">
                                            Yes
                                          </SelectItem>
                                          <SelectItem value="No">No</SelectItem>
                                          <SelectItem value="Unknown">
                                            Unknown
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}

                                    {isYN && (
                                      <Select
                                        value={value}
                                        onValueChange={(v) =>
                                          handleMissingInfoChange(fieldKey, v)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Yes">
                                            Yes
                                          </SelectItem>
                                          <SelectItem value="No">No</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}

                                    {isTravelPurpose && (
                                      <Select
                                        value={value}
                                        onValueChange={(v) =>
                                          handleMissingInfoChange(fieldKey, v)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select purpose" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="business">
                                            Business
                                          </SelectItem>
                                          <SelectItem value="tourism">
                                            Tourism
                                          </SelectItem>
                                          <SelectItem value="medical">
                                            Medical
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}

                                    {isNumber && !isYN && !isYNUnknown && (
                                      <Input
                                        type="number"
                                        placeholder={label}
                                        value={value}
                                        onChange={(e) =>
                                          handleMissingInfoChange(
                                            fieldKey,
                                            e.target.value
                                          )
                                        }
                                      />
                                    )}

                                    {!isYN &&
                                      !isYNUnknown &&
                                      !isNumber &&
                                      !isTravelPurpose && (
                                        <Input
                                          placeholder={label}
                                          value={value}
                                          onChange={(e) =>
                                            handleMissingInfoChange(
                                              fieldKey,
                                              e.target.value
                                            )
                                          }
                                        />
                                      )}
                                  </div>
                                );
                              }
                            )}
                          </div>

                          <Button
                            type="button"
                            className="mt-2"
                            onClick={handleMissingInfoSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Re-running evaluation...
                              </>
                            ) : (
                              "Provide missing information"
                            )}
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

          {/* -------- Final / main result -------- */}
          {result && (!provisionalResult || hasRerun) && (
            <div
              className={`mt-4 rounded-lg border p-4 ${
                result.decision === "Likely Eligible"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : result.decision === "Likely Ineligible"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-yellow-200 bg-yellow-50 text-yellow-800"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.decision === "Likely Eligible" ? (
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                )}

                <div>
                  <h4 className="font-semibold">
                    {hasRerun && provisionalResult ? "Final result" : "Result"}
                  </h4>

                  {result.decision && (
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Decision:</span>{" "}
                      {result.decision}
                    </p>
                  )}

                  <p className="mt-1 text-sm">
                    <span className="font-semibold">Explanation:</span>{" "}
                    {result.explanation || result.error}
                  </p>

                  {typeof result.confidence === "number" && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Confidence: {result.confidence}%
                    </p>
                  )}

                  {result.citations && result.citations.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p className="font-semibold">Citations:</p>
                      <ul className="list-disc pl-4">
                        {result.citations.map(
                          (citation: number, index: number) => (
                            <li key={index}>Document {citation}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {result.missing_information &&
                    result.missing_information.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p className="font-semibold">Missing Information:</p>
                        <ul className="list-disc pl-4">
                          {result.missing_information.map(
                            (info: string, index: number) => (
                              <li key={index}>{info}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
