import { NextResponse } from 'next/server';
import { getAuthSession, isUserAdmin, isUserManager } from 'msps/lib/auth/authenticated';
import prisma from 'msps/lib/prisma';

interface InputObject {
  [key: string]: string | number | boolean | null | undefined | { name: string };
}

interface OutputObject {
  [key: string]: number | string | object;
}

function removeFalseValuesAndConvertTrue<T extends InputObject>(list: T[]): OutputObject[] {
  return list.map(item => {
    const newItem: OutputObject = {};
    for (const key in item) {
      if (item[key] instanceof Date) {
        newItem[key] = (item[key] as Date).toISOString();
      } else if (item[key] === true) {
        newItem[key] = 1;
      } else if (key === 'hospital' && item[key] && typeof item[key] === 'object') {
        // Handle hospital object specifically
        newItem['hospital_name'] = (item[key] as { name: string }).name;
      } else if (item[key]) {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}

export async function GET() {
  const session = await getAuthSession();
  const isAdmin = await isUserAdmin();
  const isManager = await isUserManager();

  // Only admin and manager roles can access this endpoint
  if (!isAdmin && !isManager) {
    return NextResponse.json({ error: 'You do not have permission to access this endpoint' }, { status: 403 });
  }

  // Get hospital ID for filtering (admin can see all, manager only their hospital)
  const hospitalId = isAdmin ? undefined : session.hospitalId;

  const noninfectiousList = await prisma.noninfectious.findMany({
    where: hospitalId ? { hospital_id: hospitalId } : undefined,
    select: {
      id: true,
      patient_id: true,
      date: true,
      hernia: true,
      catheter_positioning: true,
      catheter_malposition: true,
      catheter_intraluminal_occlusion: true,
      catheter_extraluminal_occlusion: true,
      catheter_rinking: true,
      catheter_repositioning: true,
      catheter_leakage: true,
      hydrothorax: true,
      abdominal_leakage: true,
      genital_discharge: true,
      hepomeritoneum: true,
      chyloperitoneum: true,
      catheter_decrease: true,
      eps: true,
      other: true,
      other_comment: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  const infectionsList = await prisma.infectious.findMany({
    where: hospitalId ? { hospital_id: hospitalId } : undefined,
    select: {
      id: true,
      patient_id: true,
      date: true,
      infection_type: true,
      infection_start_date: true,
      infection_end_date: true,
      staphylococcus: true,
      streptococcus: true,
      intestinal_stick: true,
      pseudomona: true,
      enterococcus: true,
      candida: true,
      other: true,
      other_comment: true,
      treatment_start_date: true,
      treatment_end_date: true,
      vancomycin: true,
      ceftazidime: true,
      ceftriaxone: true,
      cefepime: true,
      meropenem: true,
      imipenem: true,
      ciprofloxacin: true,
      cefazolin: true,
      gentamicin: true,
      clindamycin: true,
      rifampicin: true,
      fluconazole: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  const pdList = await prisma.pd.findMany({
    where: hospitalId ? { hospital_id: hospitalId } : undefined,
    select: {
      id: true,
      patient_id: true,
      date: true,
      pd_modality: true,
      solution_per_input: true,
      pd_ch_solution_136: true,
      pd_ch_solution_227: true,
      pd_ch_solution_386: true,
      icodextrin: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  const assessmentList = await prisma.kidney_assessment.findMany({
    where: hospitalId ? { hospital_id: hospitalId } : undefined,
    select: {
      id: true,
      patient_id: true,
      check_date: true,
      gfr: true,
      pet: true,
      ktv: true,
      ka_comment: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      check_date: 'desc',
    },
  });

  const patientList = await prisma.patient.findMany({
    where: hospitalId ? { hospital_id: hospitalId } : undefined,
    select: {
      id: true,
      birth_date: true,
      sex: true,
      bmi: true,
      transplantation_date: true,
      pd_transit_date: true,
      md_diabetes: true,
      md_hypertension: true,
      md_glomerulonephritis: true,
      md_adptd: true,
      md_lupus: true,
      md_vasculitis: true,
      md_amyloidosis: true,
      md_unknown: true,
      md_other: true,
      md_other_comment: true,

      cd_heart: true,
      cd_cancer: true,
      cd_a_pressure: true,
      cd_p_pressure: true,
      cd_cirrhosis: true,
      cd_demention: true,
      cd_pqod: true,
      cd_other: true,
      cd_other_comment: true,

      mors: true,
      mors_date: true,
      mors_reason: true,
      mors_comment: true,

      region: {
        select: {
          name: true,
        },
      },
      staff_patient_doctor_idTostaff: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({
    // @ts-expect-error: Date conversion handled in function
    patients: removeFalseValuesAndConvertTrue(patientList),
    // @ts-expect-error: Date conversion handled in function
    assessments: removeFalseValuesAndConvertTrue(assessmentList),
    // @ts-expect-error: Date conversion handled in function
    pds: removeFalseValuesAndConvertTrue(pdList),
    // @ts-expect-error: Date conversion handled in function
    infections: removeFalseValuesAndConvertTrue(infectionsList),
    // @ts-expect-error: Date conversion handled in function
    noninfections: removeFalseValuesAndConvertTrue(noninfectiousList),
  });
}
