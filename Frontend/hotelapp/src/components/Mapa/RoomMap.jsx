import React, { useRef, useState, useEffect} from "react";

const RoomMap = ({ rooms, onSelectRoom, selectedRoom, zoomLevel, clickModal}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const mapWidth = Math.max(...rooms.map((room) => room.posX + 50)) + 100;
    const mapHeight = Math.max(...rooms.map((room) => room.posY + 50)) + 100;


    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;

            const centerX = (containerWidth - mapWidth * zoomLevel) / 2;
            const centerY = (containerHeight - mapHeight * zoomLevel) / 2;

            setPosition({ x: centerX, y: centerY });
        }
    }, [mapWidth, mapHeight, zoomLevel]);

  const getRoomStatusColor = (status) => {
    switch (status) {
      case "disponible":
        return "bg-green-100 border-green-500";
      case "ocupada":
        return "bg-red-100 border-red-500";
      case "reservada":
        return "bg-blue-100 border-blue-500";
      case "mantenimiento":
        return "bg-amber-100 border-amber-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
          transformOrigin: "0 0",
          width: mapWidth,
          height: mapHeight,
        }}
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`absolute border flex items-center justify-center cursor-pointer transition-colors text-center text-xs ${getRoomStatusColor(room.estado)} ${selectedRoom?.id === room.id ? "ring-2 ring-black ring-offset-2" : ""}`}
            style={{
              left: room.posX,
              top: room.posY,
              width: 50,
              height: 50,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectRoom(room);
              clickModal(room)
            }}
          >
            <div>
              <div className="font-bold">{room.numero}</div>
            </div>
            {room.Reservas.length > 0 && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full w-3 h-3 flex items-center justify-center">
                !
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomMap;