import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface FormWizard {
  id: string;
  label: string;
  content: React.ReactNode;
  isDisabled?: boolean;
}

export interface FormWizardNav {
  id: number;
  icon: [IconPrefix, IconName];
  title: string;
  detail: string;
  content: React.ReactNode
}

export interface FormWizardProps {
  className?: string;
  tabData: FormWizardNav[];
  isTabClickEnabled?: boolean;
}