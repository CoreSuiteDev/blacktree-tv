"use client";

import {
  AirPlayButton,
  CaptionButton,
  Controls,
  FullscreenButton,
  GoogleCastButton,
  MediaPlayer,
  MediaProvider,
  Menu,
  MuteButton,
  PIPButton,
  Poster,
  Spinner,
  VolumeSlider,
  useCaptionOptions,
  useMediaState,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from "@vidstack/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from "@vidstack/react/icons";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import {
  Airplay,
  Captions,
  CaptionsOff,
  Cast,
  Gauge,
  LucideIcon,
  Maximize,
  MessageSquare,
  MessageSquareOff,
  Minimize,
  PictureInPicture,
  Settings,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { usePlayerStore } from "../store/player.store";

const CinematicControls = () => {
  const { isChatOpen, toggleChat } = usePlayerStore();
  const canAirPlay = useMediaState("canAirPlay");
  const canGoogleCast = useMediaState("canGoogleCast");

  return (
    <Controls.Root
      className={`absolute inset-0 z-50 flex flex-col justify-end gap-2 md:gap-4 transition-opacity duration-300 opacity-0 data-visible:opacity-100 ${
        isChatOpen ? "px-6  py-4" : "px-6 py-4 md:py-8 lg:py-12" // Even larger padding when player is wide (Chat Closed)
      }`}
    >
      {/* Middle Section: Typography */}
      <div className="flex flex-col gap-1 md:gap-2 items-start max-w-2xl pointer-events-none select-none">
        <h1 className="text-white text-lg md:text-2xl font-medium tracking-tighter uppercase leading-none">
          BEYOND THE STORY
        </h1>
        <h2 className="text-white/90 text-xs md:text-base font-normal tracking-tight">
          Episode 4: Finding Home
        </h2>
      </div>
      {/* Bottom Section: Controls */}
      <div className="flex justify-between items-end w-full pointer-events-auto">
        {/* Sound Control Group */}
        <div className="flex items-center gap-2 md:gap-4 group/volume">
          <MuteButton className="group ring-sky-400 relative inline-flex px-2 h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-focus:ring-4 data-active:text-indigo-400">
            <VolumeOff className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='muted']:block" />
            <Volume1 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='low']:block" />
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[state='high']:block" />
          </MuteButton>

          <VolumeSlider.Root className="group relative mx-[7.5px] hidden md:inline-flex h-10 w-full min-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <VolumeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
              <VolumeSlider.TrackFill className="bg-indigo-400 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
            </VolumeSlider.Track>

            <VolumeSlider.Preview
              className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
              noClamp
            >
              <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
            </VolumeSlider.Preview>

            <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
          </VolumeSlider.Root>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1.5 md:gap-4 text-white/70">
            {canAirPlay && (
              <AirPlayButton className="hidden md:inline-flex group ring-sky-400 relative h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400">
                <Airplay className="w-5 h-5" />
              </AirPlayButton>
            )}
            {canGoogleCast && (
              <GoogleCastButton className="hidden md:inline-flex group ring-sky-400 relative h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400">
                <Cast className="w-5 h-5" />
              </GoogleCastButton>
            )}
            <CaptionButton className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400">
              <CaptionsOff className="w-5 h-5 md:w-6 md:h-6 hidden group-data-[active]:block" />
              <Captions className="w-5 h-5 md:w-6 md:h-6 group-data-[active]:hidden" />
            </CaptionButton>
            <PIPButton className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400">
              <PictureInPicture className="w-5 h-5 md:w-6 md:h-6" />
            </PIPButton>
            <FullscreenButton className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400">
              <Maximize className="w-4 h-4 md:w-5 md:h-5 group-data-[active]:hidden" />
              <Minimize className="w-4 h-4 md:w-5 md:h-5 hidden group-data-[active]:block" />
            </FullscreenButton>

            {!useMediaState("fullscreen") && (
              <button
                onClick={toggleChat}
                className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400 p-1"
                aria-label="Toggle Chat"
              >
                {isChatOpen ? (
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <MessageSquareOff className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            )}

            <Menu.Root>
              <Menu.Button
                className="group ring-sky-400 relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 data-[active]:text-indigo-400 p-1"
                aria-label="Settings"
              >
                <Settings className="h-4 h-4 md:h-5 md:w-5 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
              </Menu.Button>
              <Menu.Items
                className="animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden"
                placement="top"
                offset={0}
              >
                <div className="flex flex-col gap-1">
                  <div className="px-2.5 pb-2 text-xs font-bold uppercase tracking-widest text-white/40">
                    Settings
                  </div>

                  {/* Quality Submenu */}
                  <QualitySubmenu />

                  {/* Speed Submenu */}
                  <SpeedSubmenu />

                  {/* Captions Submenu */}
                  <CaptionsSubmenu />
                </div>
              </Menu.Items>
            </Menu.Root>
          </div>
        </div>
      </div>
    </Controls.Root>
  );
};

function CaptionsSubmenu() {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? "Default";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Captions"
        hint={hint}
        disabled={options.disabled}
        icon={CaptionsOff}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

// Re-use styles across submenus.
const submenuClassName =
    "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block",
  radioClassName =
    "ring-sky-400 group relative flex w-full gap-1 cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]",
  radioIconClassName = "h-4 w-4 text-white group-data-[checked]:hidden",
  radioSelectedIconClassName =
    "text-indigo-400 hidden h-4 w-4 group-data-[checked]:block";

function SpeedSubmenu() {
  const options = usePlaybackRateOptions(),
    hint =
      options.selectedValue === "1" ? "Normal" : options.selectedValue + "x";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Speed"
        hint={hint}
        disabled={options.disabled}
        icon={Gauge}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function QualitySubmenu() {
  const options = useVideoQualityOptions(),
    currentQuality = options.selectedQuality?.height,
    hint =
      options.selectedValue !== "auto" && currentQuality
        ? `${currentQuality}p`
        : `Auto${currentQuality ? ` (${currentQuality}p)` : ""}`;
  return (
    <Menu.Root>
      <SubmenuButton
        label="Quality"
        hint={hint}
        disabled={options.disabled}
        icon={Settings}
      />
      <Menu.Content className={submenuClassName}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, bitrateText, select }) => (
            <Menu.Radio
              className={radioClassName}
              value={value}
              onSelect={select}
              key={value}
            >
              <RadioButtonIcon className={radioIconClassName} />
              <RadioButtonSelectedIcon className={radioSelectedIconClassName} />
              {label}
              {bitrateText ? (
                <span className="text-[13px] text-gray-300 ml-auto">
                  {bitrateText}
                </span>
              ) : null}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: LucideIcon;
}

function SubmenuButton({
  label,
  hint,
  icon: Icon,
  disabled,
}: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="ring-sky-400 parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none ring-inset data-[open]:sticky data-[open]:-top-2.5 data-[hocus]:bg-white/10 data-[focus]:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[18px] w-[18px]" />
      <Icon className="w-5 h-5 parent-data-[open]:hidden" />
      <span className="ml-1.5 parent-data-[open]:ml-0">{label}</span>
      <span className="ml-auto text-sm text-white/50">{hint}</span>
      <ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 h-[18px] w-[18px] text-sm text-white/50" />
    </Menu.Button>
  );
}

const VidPlayer = () => {
  const { isChatOpen, toggleChat } = usePlayerStore();
  return (
    <MediaPlayer
      title="Beyond The Story"
      src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
      crossOrigin="anonymous"
      playsInline
      logLevel="silent"
      streamType="live"
      viewType="video"
      autoPlay
      muted
      fullscreenOrientation="portrait"
      onOrientationChange={undefined}
      className="w-full aspect-video bg-black overflow-hidden rounded-xl shadow-2xl group/player data-[fullscreen]:rounded-none data-[fullscreen]:aspect-auto data-[fullscreen]:h-full transition-all duration-300"
    >
      <MediaProvider>
        <Poster className="absolute inset-0 w-full h-full object-cover opacity-50" />
      </MediaProvider>

      {/* Permanent Overlay: Always Visible */}
      <div
        className={`absolute z-10 transition-all duration-300 pointer-events-none ${
          isChatOpen
            ? "top-4 right-4 lg:top-8 lg:right-8"
            : "top-6 right-6 lg:top-12 lg:right-12"
        }`}
      >
        <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-md shadow-[0_0_20px_rgba(var(--primary),0.4)] border border-white/10">
          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
          <span className="text-primary-foreground text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none">
            LIVE
          </span>
        </div>
      </div>

      <CinematicControls />

      <BufferingIndicator />
    </MediaPlayer>
  );
};

export default VidPlayer;

function BufferingIndicator() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center">
      <Spinner.Root
        className="text-white opacity-0 transition-opacity duration-200 ease-linear media-buffering:animate-spin media-buffering:opacity-100"
        size={84}
      >
        <Spinner.Track className="opacity-25" width={8} />
        <Spinner.TrackFill className="opacity-75" width={8} />
      </Spinner.Root>
    </div>
  );
}
