'use client';
import React from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] =
    React.useState(0);
  const [isRunning, setIsRunning] =
    React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning]);

  const selectedColorIndex =
    timeElapsed % COLORS.length;
  const selectedColor =
    COLORS[selectedColorIndex];
  const outlineTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: 'spring',
        stiffness: 500,
        damping: 36,
      };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layoutId="selected-color-outline"
                  transition={outlineTransition}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              setIsRunning((prevValue) =>
                !prevValue
              );
            }}
          >
            {isRunning ? <Pause /> : <Play />}
            <VisuallyHidden>
              {isRunning ? 'Pause' : 'Play'}
            </VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
