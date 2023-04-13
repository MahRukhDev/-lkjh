import { useTranslation } from "@pancakeswap/localization";
import styled from "styled-components";
import { Text } from "../../../../components/Text";
import { HelpIcon } from "../../../../components/Svg";
import { Skeleton } from "../../../../components/Skeleton";
import { useTooltip } from "../../../../hooks/useTooltip";
import { FarmTableMultiplierProps } from "../../types";
import { Link } from "../../../../components/Link";

const ReferenceElement = styled.div`
  display: inline-block;
`;

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 4px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const InlineText = styled(Text)`
  display: inline;
`;

const InlineLink = styled(Link)`
  display: inline-block;
  margin: 0 4px;
`;

const Multiplier: React.FunctionComponent<React.PropsWithChildren<FarmTableMultiplierProps>> = ({
  multiplier,
  rewardCakePerSecond,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />;
  const { t } = useTranslation();
  const tooltipContent = (
    <>
      {rewardCakePerSecond ? (
        <>
          <Text>
            {t(
              "The Multiplier represents the proportion of CAKE rewards each farm receives, as a proportion of the CAKE produced each second."
            )}
          </Text>
          <Text my="24px">
            {" "}
            {t("For example, if a 1x farm received 1 CAKE per second, a 40x farm would receive 40 CAKE per second.")}
          </Text>
          <Text>{t("This amount is already included in all APR calculations for the farm.")}</Text>
        </>
      ) : (
        <>
          <Text bold>
            {t("Farm’s CAKE Per Second:")}
            <InlineText marginLeft={2}>{farmCakePerSecond}</InlineText>
          </Text>
          <Text bold>
            {t("Total Multipliers:")}
            <InlineText marginLeft={2}>{totalMultipliers}</InlineText>
          </Text>
          <Text my="24px">
            {t(
              "The Farm Multiplier represents the proportion of CAKE rewards each farm receives as a proportion of its farm group."
            )}
          </Text>
          <Text my="24px">
            {t("For example, if a 1x farm received 1 CAKE per block, a 40x farm would receive 40 CAKE per block.")}
          </Text>
          <Text>
            {t("Different farm groups share a different sets of multipliers.")}
            <InlineLink
              mt="8px"
              display="inline"
              href="https://docs.pancakeswap.finance/products/yield-farming/faq#why-a-2x-farm-in-v3-has-less-apr-than-a-1x-farm-in-v2"
              external
            >
              {t("Learn more")}
            </InlineLink>
            {t("here.")}
          </Text>
        </>
      )}
    </>
  );
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: "top-end",
    tooltipOffset: [20, 10],
  });

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  );
};

export default Multiplier;
