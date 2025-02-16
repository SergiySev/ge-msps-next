import { ChatBubbleBottomCenterIcon } from '@heroicons/react/16/solid';
import { Tooltip } from "@heroui/react";

interface WhoMadeItProps {
  creator: string;
  updater: string;
  createdAt: string;
  updatedAt: string;
}

export default function WhoMadeIt({ creator, createdAt, updater, updatedAt }: WhoMadeItProps) {
  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-tiny">
            შექმნილია: {creator} {createdAt}
          </div>
          <div className="text-tiny">
            შეცვლილია: {updater} {updatedAt}
          </div>
        </div>
      }
    >
      <ChatBubbleBottomCenterIcon className="h-4 w-4" />
    </Tooltip>
  );
}
