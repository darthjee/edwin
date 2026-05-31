import { describe, expect, it, vi } from 'vitest';
import { DialogBoxController } from '../../../lib/components/controllers/DialogBoxController.js';

describe('DialogBoxController', () => {
  it('advances to next message while not on the last one', () => {
    const setActiveIndex = vi.fn();
    const onClose = vi.fn();
    const controller = new DialogBoxController(onClose, setActiveIndex);

    controller.nextMessage(0, 2);

    expect(setActiveIndex).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when trying to advance from last message', () => {
    const setActiveIndex = vi.fn();
    const onClose = vi.fn();
    const controller = new DialogBoxController(onClose, setActiveIndex);

    controller.nextMessage(1, 2);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(setActiveIndex).not.toHaveBeenCalled();
  });

  it('moves to previous message without going below zero', () => {
    const setActiveIndex = vi.fn();
    const controller = new DialogBoxController(vi.fn(), setActiveIndex);

    controller.previousMessage();

    expect(setActiveIndex).toHaveBeenCalledTimes(1);
    expect(setActiveIndex.mock.calls[0][0](0)).toBe(0);
    expect(setActiveIndex.mock.calls[0][0](2)).toBe(1);
  });
});
