import { toast } from "sonner"
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FiXCircle } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import type { ReactElement } from "react";

type StatusType = 'success' | 'error' | 'info'


interface CustomToastOptions {
  title: string
  description: string
  status?: StatusType
}

const statusMap: Record<StatusType, { icon: ReactElement; color: string }> = {
  success: {
    icon: <IoCheckmarkDoneSharp  size={30} />,
    color: '#4CAF50', 
  },
  error: {
    icon: <FiXCircle  size={30} />,
    color: '#F44336',
  },
  info: {
    icon: <FiInfo  size={30} />,
    color: '#2196F3',
  },
}

export function showToast({ title, description, status = 'info' }: CustomToastOptions) {
  const { icon, color } = statusMap[status]

  toast.custom((t) => (
    <div className="bg-[#D9D9D9] rounded-lg p-10 flex gap-20 items-center max-w-[400px] w-full">
      <div
        className="w-40 h-40 rounded-lg flex items-center justify-center text-white mt-1"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-xs font-medium text-default-btn">{title}</p>
        <p className="text-default-btn text-xs font-normal">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className="text-default-btn hover:opacity-70 mt-1"
      >
        ✕
      </button>
    </div>
  ))
}
