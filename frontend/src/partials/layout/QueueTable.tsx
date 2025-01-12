import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'

import {IconButton} from '@/components/IconButton'

import {type EmitResponse} from '@/types/socket'

type Props = {
  data: EmitResponse<'get-queue-status-comments'>
  paginationClick: (prevPage: number) => () => void
  src: string
}

const QueueTable = ({data, paginationClick, src}: Props) => {
  return (
    <div className="react-bootstrap-table1">
      <div className="w-100 table-responsive" style={{maxHeight: '72vh', position: 'relative'}}>
        <table className="table table-row-bordered">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Assigned Agent</th>
              <th>Transferred Agents</th>
              <th>Sender</th>
              {src === 'comment' ? (
                <th className="w-25">Comment</th>
              ) : (
                <th className="w-25">Customer's last message</th>
              )}
              <th>Hold</th>
              <th>Create Time</th>
              <th>Assign Time</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.docs.length > 0 &&
              data.docs.map((item, index) => {
                return (
                  <tr key={item._id} className="btn p-0 d-table-row">
                    <td>{index + 1}</td>
                    {src === 'comment' ? (
                      <td> {item.assign_user ? item.assign_user.first_name : 'unassigned'} </td>
                    ) : (
                      <td>
                        {item.assign_agent_info ? item.assign_agent_info.first_name : 'unassigned'}
                      </td>
                    )}
                    <td>
                      {item?.transfer_to && (
                        <>
                          {item.transfer_to?.map((id) => data?.transfer?.[id]?.first_name).join()}
                        </>
                      )}
                    </td>
                    <td>{item.sender_name}</td>
                    {src === 'comment' ? (
                      <td>{item.message}</td>
                    ) : (
                      <td>{item.customer_last_message?.text}</td>
                    )}
                    <td>
                      {item.hold && <p className="text-danger">Hold</p>}
                      {!item.hold && <p className="text-danger" />}
                    </td>
                    {src === 'comment' ? (
                      <td className="w-25">
                        {new Date(item.created_time).toDateString()},{' '}
                        {new Date(item.created_time).toLocaleTimeString()}
                      </td>
                    ) : (
                      <td className="w-25">
                        {new Date(item.createdAt).toDateString()},{' '}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </td>
                    )}
                    <td>
                      {item.assign_time > 0
                        ? `${new Date(item.assign_time).toDateString()}, ${new Date(
                            item.assign_time
                          ).toLocaleTimeString()}`
                        : null}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className="tw-p-4 tw-text-center">
        <div className="tw-inline-flex tw-gap-2">
          <IconButton
            disabled={!data.hasPrevPage}
            icon={<ChevronLeftIcon className="tw-size-5" />}
            onClick={paginationClick(data.prevPage)}
          />
          <IconButton
            disabled={!data.nextPage}
            icon={<ChevronRightIcon className="tw-size-5" />}
            onClick={paginationClick(data.nextPage)}
          />
        </div>
      </div>
    </div>
  )
}

export default QueueTable
