import { Alert, Card, Table, Tooltip } from "flowbite-react";
import { HiXCircle } from "react-icons/hi";

interface StatsCardProps {
  type: string;
  data: any[];
}

export default function Stats_card({ type, data = [] }: StatsCardProps) {
  if (type === "Points") {
    return (
      <Card className="max-w-xs sm:max-w-lg overflow-x-auto">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {type}
        </h5>
        <Table>
          <Table.Head>
            <Table.HeadCell>Team</Table.HeadCell>
            <Table.HeadCell>
              <Tooltip content="Position">Pos</Tooltip>
            </Table.HeadCell>
            <Table.HeadCell>Player</Table.HeadCell>
            <Table.HeadCell>
              <Tooltip content="Points">Pts</Tooltip>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <Tooltip content={item.team.fullName}>
                      {item.team.triCode}
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>{item.player.positionCode}</Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {item.player.fullName}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {item.points}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={4} className="text-center">
                  <Alert color="failure" icon={HiXCircle}>
                    <span className="font-medium">No data available</span>
                  </Alert>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card>
    );
  }
  if (type === "Goals") {
    return (
      <Card className="max-w-xs sm:max-w-lg overflow-x-auto">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {type}
        </h5>
        <Table>
          <Table.Head>
            <Table.HeadCell>Team</Table.HeadCell>
            <Table.HeadCell>
              <Tooltip content="Position">Pos</Tooltip>
            </Table.HeadCell>
            <Table.HeadCell>Player</Table.HeadCell>
            <Table.HeadCell>
              <Tooltip content="Goals">G</Tooltip>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <Tooltip content={item.team.fullName}>
                      {item.team.triCode}
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>{item.player.positionCode}</Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {item.player.fullName}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {item.goals}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={4} className="text-center">
                  <Alert color="failure" icon={HiXCircle}>
                    <span className="font-medium">No data available</span>
                  </Alert>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card>
    );
  }
}
