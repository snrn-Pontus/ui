import { RadioGroup } from '../../RadioGroup';
import { action } from '@storybook/addon-actions';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { Layout } from '../../Layout';
import { preloadAssets } from '../utils/loader';
import { defaultTextStyle } from '../../utils/helpers/styles';
import { centerElement } from '../../utils/helpers/resize';

const args = {
    text: 'Radio',
    textColor: '#FFFFFF',
    amount: 3,
    onChange: action('Radio changed')
};

export const UseSprite = ({ amount, text, textColor, onChange }: any) =>
{
    const view = new Layout({
        type: 'vertical',
        elementsMargin: 20
    });

    const assets = [`radio.png`, `radio_checked.png`];

    preloadAssets(assets).then(() =>
    {
        const items = [];

        for (let i = 0; i < amount; i++)
        {
            items.push(`${text} ${i + 1}`);
        }

        // Component usage
        const radioGroup = new RadioGroup({
            selectedItem: 0,
            items,
            type: 'vertical',
            elementsMargin: 10,
            style: {
                bg: 'radio.png',
                checked: 'radio_checked.png',
                textStyle: {
                    ...defaultTextStyle,
                    fontSize: 22,
                    fill: textColor
                }
            }
        });

        radioGroup.onChange.connect((selectedItemID: number, selectedVal: string) =>
            onChange({ id: selectedItemID, val: selectedVal })
        );

        view.addChild(radioGroup.innerView);

        centerElement(view);
    });

    return { view, resize: () => centerElement(view) };
};

export default {
    title: 'Components/RadioGroup/Use Sprite',
    argTypes: argTypes(args),
    args: getDefaultArgs(args)
};
