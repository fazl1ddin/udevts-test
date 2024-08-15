import { Icon } from "~/shared/ui/icon";

export function SideBar() {
  return (
    <div className="w-14 border-r h-screen flex flex-col items-center justify-between">
      <div>
        <div className="h-14 border-b p-3">
          <img src="./logo.svg" className="w-full h-full" />
        </div>
        <div className="px-3 [&>div]:h-14 [&>div]:py-3">
          <div>
            <Icon name="MainMenuIcon" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="px-3 [&>div]:h-14 [&>div]:py-3">
          <div>
            <Icon name="settings" className="w-full h-full" />
          </div>
        </div>
        <div className="h-14 border-t p-3">
          <img src="./Avatarphoto.png" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
