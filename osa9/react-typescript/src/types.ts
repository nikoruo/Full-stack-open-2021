

export interface HeaderProps {
    name: string;
  }

interface BaseParts {
  name: string;
  exerciseCount: number;
  type: string;
}

interface BasePartsAdvanced extends BaseParts {
  description: string;
}

interface CourseNormalPart extends BasePartsAdvanced {
  type: "normal";  
}
interface CourseProjectPart extends BaseParts {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends BasePartsAdvanced {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends BasePartsAdvanced {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;