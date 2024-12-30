import CdDropdownToggle from "@atoms/DropdownToggle/CdDropdownToggle";
import CdDropdownMenu from "@atoms/DropdownMenu/CdDropdownMenu";
import CdDropdown from "@atoms/Dropdown/CdDropdown";
import { DateFormat } from "@enums/date-format-types";
import { currentDateTime, formatDate } from "@utils/helper/format-date";
import Cleave from "cleave.js/react";
import { ChevronDown } from "react-feather";
import { useEffect, useRef, useState } from "react";

interface CdTimePickerProps {
	id: string;
	label?: string;
	value?: string;
	onChange: (time: string) => void;
	disabled?: boolean;
	className?: string;
}

const useTimeOptions = () => {
	const [timeOptions, setTimeOptions] = useState<string[]>([]);

	useEffect(() => {
		const generateTimeOptions = () => {
			const times: string[] = [];
			let currentTime = currentDateTime();
			currentTime.startOf("day");
			for (let i = 0; i < 48; i++) {
				times.push(formatDate(currentTime.toDate(), DateFormat.hh_mm_A));
				currentTime.add(30, "minutes");
			}
			setTimeOptions(times);
		};
		generateTimeOptions();
	}, []);

	return timeOptions;
};

const useCurrentTimePlaceholder = () => {
	const [currentTimePlaceholder, setCurrentTimePlaceholder] = useState("");

	useEffect(() => {
		setCurrentTimePlaceholder(formatDate(currentDateTime(), DateFormat.hh_mm_A));
	}, []);

	return currentTimePlaceholder;
};

const CdTimePicker: React.FC<CdTimePickerProps> = ({
	id,
	label,
	value = "",
	onChange,
	disabled = false,
	className = "",
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [timeInput, setTimeInput] = useState(value);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const timeOptions = useTimeOptions();
	const currentTimePlaceholder = useCurrentTimePlaceholder();

	const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value.toUpperCase();
		setTimeInput(rawValue);
	};

	const handleBlur = () => {
		const trimmed = timeInput.trim();
		const TimePattern = /^([0-1]?\d):([0-5]\d)\s?(AM|PM)$/i;
		if (TimePattern.test(trimmed)) {
			onChange(trimmed);
		} else {
			const [hrs, minsWithAmPm] = trimmed.split(":");
			const mins = minsWithAmPm ? minsWithAmPm.replace(/\D/g, '') : '00';
			const amPm = minsWithAmPm ? minsWithAmPm.replace(/\d/g, '').trim() : '';
			const parsedTime = currentDateTime().set("hour", parseInt(hrs, 10)).set("minute", parseInt(mins, 10));
			if (amPm.toUpperCase() === 'PM' && parsedTime.hour() < 12) {
				parsedTime.add(12, 'hours');
			} else if (amPm.toUpperCase() === 'AM' && parsedTime.hour() === 12) {
				parsedTime.subtract(12, 'hours');
			}
			if (parsedTime.isValid()) {
				const corrected = formatDate(parsedTime, DateFormat.hh_mm_A);
				setTimeInput(corrected);
				onChange(corrected);
			} else {
				const fallback = formatDate(currentDateTime(), DateFormat.hh_mm_A);
				onChange(fallback);
			}
		}
	};

	const handleTimeSelect = (time: string) => {
		const [hours, minutesWithAmPm] = time.split(":");
		const minutes = minutesWithAmPm.slice(0, 2);
		const amPm = minutesWithAmPm.slice(3);
		const parsedTime = currentDateTime().set("hour", parseInt(hours, 10)).set("minute", parseInt(minutes, 10));
		if (amPm.toUpperCase() === 'PM' && parsedTime.hour() < 12) {
			parsedTime.add(12, 'hours');
		} else if (amPm.toUpperCase() === 'AM' && parsedTime.hour() === 12) {
			parsedTime.subtract(12, 'hours');
		}
		const formattedTime = formatDate(parsedTime.toDate(), DateFormat.hh_mm_A);
		setTimeInput(formattedTime);
		onChange(formattedTime);
		setDropdownOpen(false);
	};

	useEffect(() => {
		if (dropdownOpen && dropdownMenuRef.current) {
			const now = formatDate(currentDateTime(), DateFormat.hh_mm_A);
			const currentIndex = timeOptions.findIndex((t) => t === now);
			if (currentIndex !== -1) {
				const el = dropdownMenuRef.current.children[currentIndex] as HTMLElement;
				el?.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}
	}, [dropdownOpen, timeOptions]);

	useEffect(() => {
		if (value) {
			setTimeInput(value);
		}
	}, [value]);

	return (
		<div className={`cd-time-picker ${className}`} id={`${id}-wrapper`}>
			<CdDropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="cd-time-picker-dropdown position-relative">
				<CdDropdownToggle className="d-inline-flex align-items-center">
					{label && <label htmlFor={id} className="me-2">{label}</label>}
					<div className="position-relative d-inline-block" style={{ width: '100%' }}>
						<Cleave
							id={id}
							value={timeInput}
							options={{
								delimiters: [':', ' '],
								blocks: [2, 2, 2],
								uppercase: true,
								numericOnly: false,
							}}
							disabled={disabled}
							placeholder={currentTimePlaceholder}
							className="form-control"
							style={{ fontSize: '14px' }}
							onChange={handleInputChange}
							onBlur={handleBlur}
						/>
						<ChevronDown className="position-absolute end-0 top-50 translate-middle-y me-2" size={12} />
					</div>
				</CdDropdownToggle>
				<CdDropdownMenu className="cd-time-picker-menu overflow-auto rounded-2 bg-white shadow-sm" innerRef={dropdownMenuRef}>
					{timeOptions.map((time, index) => (
						<div
							key={index}
							className={`cd-time-picker-item px-3 py-2 ${time === formatDate(currentDateTime(), DateFormat.hh_mm_A) ? "bg-primary text-white" : "hover:bg-gray-100"} text-base cursor-pointer rounded-md transition-colors duration-300`}
							onClick={() => handleTimeSelect(time)}
						>
							{time}
						</div>
					))}
				</CdDropdownMenu>
			</CdDropdown>
		</div>
	);
};

export default CdTimePicker;
