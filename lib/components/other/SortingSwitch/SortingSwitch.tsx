'use client';

import { useSwitch, VisuallyHidden, SwitchProps, Tooltip } from '@nextui-org/react';
import { BarsArrowDownIcon, NumberedListIcon } from '@heroicons/react/16/solid';
import { useTranslations } from 'next-intl';

const SortingSwitch = (props: SwitchProps) => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);

  const lastEdited = 'ბოლო რედაქტირებული ჩანაწერები';
  const lastAdded = 'ბოლო დამატებული ჩანაწერები';
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <Tooltip content={isSelected ? lastAdded : lastEdited}>
          <div className="flex flex-row items-center gap-1">
            <div
              {...getWrapperProps()}
              className={slots.wrapper({
                class: [
                  'w-5 h-5',
                  'flex items-center justify-center',
                  'rounded-lg bg-default-100 hover:bg-default-200',
                ],
              })}
            >
              {isSelected ? (
                <BarsArrowDownIcon className="min-w-4 min-h-4" />
              ) : (
                <NumberedListIcon className="min-w-4 min-h-4" />
              )}
            </div>
            <p className="inline-block text-default-500 select-none text-xs">{t('sorting')}</p>
          </div>
        </Tooltip>
      </Component>
    </div>
  );
};

export default SortingSwitch;
